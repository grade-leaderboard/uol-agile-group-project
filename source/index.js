require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("mysql-promise")();
const path = require("path");
var fakeAuth = require("./middlewares/fakeAuth");

db.configure({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

global.db = db;

const app = express();
const port = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, "/public")));
app.use(fakeAuth);
// configure database connection
// mysql.configure({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "calorieTracking"
// });
// make database connection available as global variable
// app.listen(port, async () => {
//     try {
//         await db.query("SELECT 1 from foods limit 1");
//         console.log("Connected to database")
//         console.log(`CalorieBuddy app listening on port ${port}`);
//     } catch (err) {
//         console.log(err)
//     }
// });

// // connect to database
// db.connect((err) => {
// 	if (err) {
// 		throw err;
// 	}

// 	console.log("Connected to database");
// });

app.use(bodyParser.urlencoded({
	extended: true
}));

require("./routes/main")(app);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));