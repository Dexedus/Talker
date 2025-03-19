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
  origin: "http://localhost:3000",  // The URL where your React app is running
  methods: "GET,POST",              // Allow POST requests
  credentials: true                 // Allow credentials (cookies, etc.)
}));
app.use(express.json());  // Middleware for parsing JSON request bodies
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
})

app.post("/signup", async (req, res) => {

  const {username, password} = req.body

  const checkUsernameResult = await db.query("SELECT * FROM users WHERE ($1) = username", [username])

  if(checkUsernameResult.rows.length === 0){

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  await db.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *", [username, hashedPassword])

  res.status(200).json({ message: "User registered successfully"});
  } else {
  res.status(400).json({ message: "Username already taken"});
  }
})

app.post("/login", (req, res) => {

})


app.listen(5000, () => {
    console.log("Running on port 5000")
});