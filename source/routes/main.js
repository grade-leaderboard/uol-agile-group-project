const checkAuth = require("../middlewares/checkAuth");

module.exports = function (app) {
	app.get("/", async (req, res) => {
		try {
			console.log(req.user.name);
			let sql = "SELECT  m.id, m.title, m.grade, COUNT(g.course_id) AS 'submissions' \
								FROM modules_with_grades m \
								LEFT JOIN grades g \
								ON g.course_id = m.id\
								GROUP BY m.id\
								ORDER BY id ASC" ; 
								
			var [results, _] = await db.query(sql);
			res.render("index.html", {
				res: results,
			});
			console.log(results)
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

	app.get("/module_leaderboard", checkAuth, async (req, res) => {
		try {
			id = [req.query.module_id];
			// let sql = "SELECT * FROM grades WHERE course_id = ? ORDER BY grade DESC";
			let sql =
				"SELECT grades.grade, users.name, grades.anonymous \
						FROM grades \
						JOIN users  \
						ON grades.user_id = users.id \
						WHERE course_id = ? \
						ORDER BY grade DESC";
			var [results, _] = await db.query(sql, id);
			results.forEach((row) => {
				if (row.anonymous) {
					row.name = "Anonymous";
				}
			});
			res.render("module_leaderboard.html", { res: results, course_id: id });
		} catch (error) {
			console.log(error);
		}
	});

	app.get("/personal_grade", checkAuth, async (req, res) => {
		try{
			let username = [req.user.name]
			// console.log(req.user.name);
			let sql = 
			"SELECT study_sessions.title AS session, grades.course_id, courses.title, grades.grade\
					FROM grades \
					JOIN users \
					ON grades.user_id = users.id \
					JOIN study_sessions \
					ON study_sessions.id = grades.study_session_id \
					JOIN courses \
					ON courses.id = grades.course_id \
					WHERE users.name = ? ";
			var [results, _] = await db.query(sql, username);
			res.render("personal_grade.html", {user: username, res: results});

		} catch(error){
			console.log(error);
		}

	});
};
