import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import 'dotenv/config';

const app = express()

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
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(5000, () => {
    console.log("Running on port 5000")
});