require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("mysql-promise")();
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const putUserInAllViews = require("./middlewares/putUserInAllViews");
const flash = require("flash");

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
app.use(bodyParser.urlencoded({ extended: true }));

const sessionStore = new MySQLStore({}, db);
app.use(
	session({
		key: "grades-leaderboard-session",
		secret: process.env.SESSION_SECRET,
		store: sessionStore,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(putUserInAllViews); //must go after passport.initialize()/.session()
app.use(flash());
require("./routes/main")(app, passport);
require("./config/passport")(passport);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
