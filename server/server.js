import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import pg from "pg";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import 'dotenv/config';
import pgSession from "connect-pg-simple";


const app = express()

  //Database Connection
const db = new pg.Client({
    user: process.env.un,
    host: process.env.host,
    database: "ReactAppRender",
    password: process.env.pw,
    port: 5432,
    ssl: true,
  });
  db.connect();

  //Middleware
app.use(cors({
  origin: process.env.domain,       // The URL where your React app is running
  methods: "GET,POST",              // Allow POST requests
  credentials: true                 // Allow credentials (cookies, etc.)
}));

app.use(express.json());            // Middleware for parsing JSON request bodies
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Middleware for creating session
app.use(
  session({
    secret: "TOPSECRETWORD",
    resave: false,
    saveUninitialized: false, 
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

//Passport module MUST go after session module.
app.use(passport.initialize());
app.use(passport.session());

let account = [];
let userID = []



app.post("/signup", async (req, res) => {
// Get the username and password via bodyParser
  const {username, password} = req.body

// Check to see if the username already exists in the database.
  const checkUsernameResult = await db.query("SELECT * FROM users WHERE username = $1", [username])

// If username doesn't exist in database, then insert the username and hashed password into the users table. Then, return a status 200
  if(checkUsernameResult.rows.length === 0){

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  await db.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *", [username, hashedPassword])

  res.status(200).json({ message: "User registered successfully"});
  } else {
// If username exists in database, return an error in the form of status 400
  res.status(400).json({ message: "Username already taken"});
  }
});



app.get("/getPosts", async (req, res) => {
  if(req.isAuthenticated()){
  try {
    const result = await db.query("SELECT * FROM messages ORDER BY created_at DESC");
    res.json(result.rows);
    console.log(result.rows);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
} else {
  res.status(401).json({ error: "Not Authenticated" })
}
});

app.post("/addPosts", async (req, res) => {
  if(req.isAuthenticated()){
  try {
    const { message } = req.body;
    const userID = req.user.id
    const result = await db.query("INSERT INTO messages (content, user_id) VALUES ($1, $2) RETURNING *", [message, userID])
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding posts:", error);
    res.status(500).json({ error: "Internal  Server Error" });
  }
} else {
  return res.status(401).json({ error: "User is not authenticated" })
}
});





//Acceptlogin
app.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/failedPassword"
}));

app.get("/", (req, res) => {
  if(req.isAuthenticated()){
  res.status(200).json({
    message: "Welcome, authenticated user!",
  });
} else {
  res.status(401).json( { message: "Error Authenticating User" } )
}
})

//Wrong password
app.get("/failedPassword", (req, res) => {
  res.status(401).json({ message: "Invalid username or password" });
});







passport.use (new LocalStrategy(async function verify (username, password, cb){
  try {
      //Find the account with the matching email
  let data = await db.query("SELECT * FROM users WHERE username = ($1)", [username]);

  //If account exists then get the hashed password and the userID
if (data.rows.length > 0){
  let account = data.rows[0]
  let hashedPassword = account.password;
  userID = account.id;

  //Compare the inputted password with the hashedpassword.
  const result = await bcrypt.compare(password, hashedPassword);
  if (result) {
    return cb(null, account);
  } else {
    return cb(null, false, { message: "Invalid credentials" });
  }

} else {
  return cb("user not found")
};

} catch (err) {
  return cb(err)
}
})
);


passport.serializeUser((account, cb) => {
  cb(null, account.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (!rows.length) return cb("User not found");
    cb(null, rows[0]);
  } catch (err) {
    cb(err);
  }
});







app.listen(5000, () => {
    console.log("Running on port 5000")
});