const checkAuth = require("../middlewares/checkAuth");

module.exports = function (app) {
	app.get("/", async (req, res) => {
		try {
			console.log(req.user.name);
			let sql = "SELECT * FROM modules_with_grades ORDER BY id ASC";
			var [results, _] = await db.query(sql);
			res.render("index.html", {
				res: results
			});
		} catch (error) {
			console.log(error);
		}
	});

	app.post("/grades", checkAuth, async (req, res) => {
		try {
			console.log(req.user.name);
			// let sql = "SELECT * FROM modules_with_grades ORDER BY id ASC";
			// var [results, _] = await db.query(sql);
			// res.render("index.html", { res: results });
		} catch (error) {
			console.log(error);
		}
	});

};