module.exports = function (app) {
	app.get("/", async (req, res) => {
		try {
			let sql = "SELECT * FROM modules_with_grades ORDER BY id ASC";
			var [results, _] = await db.query(sql);
			res.render("index.html", { res: results });
		} catch (error) {
			console.log(error);
		}
	});

	app.get("/module_leaderboard", async (req, res) => {
		try {
			id = [req.query.module_id];
			let sql = "SELECT * FROM grades WHERE course_id LIKE ? ORDER BY grade DESC";
			var [results, _] = await db.query(sql, id);
			res.render("module_leaderboard.html", { res: results, course_id: id });
		} catch (error) {
			console.log(error);
		}
	});
};
