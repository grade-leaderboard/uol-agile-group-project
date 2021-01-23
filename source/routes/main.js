const checkAuth = require("../middlewares/checkAuth");
const checkPermission = require("../middlewares/checkPermission");
const { check, validationResult } = require('express-validator');

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
		} catch (error) {
			console.log(error);
		}
	});

	app.get("/addgrade", async (req, res) => {
		try {
			let sql = "SELECT * FROM courses ORDER BY id ASC";
			var [courses, _] = await db.query(sql);
			sql = "SELECT * FROM study_sessions ORDER BY id ASC";
			var [semesters, _] = await db.query(sql);			
			res.render("addgrade.html", {
				title: 'Leaderboard - Add grade',
				heading: "Add grade",
				courseList: courses, 
				semesterList: semesters,
				addResult: req.query.addResult,
			});
		} catch (error) {
			console.log(error);
		}
	});

	app.post("/addgrade", checkAuth, checkPermission, async (req, res) => {
		try {
			let params = [req.body.course_id, req.body.semester, req.user.id, 
				req.body.grade, !!req.body.anonymous]
			let sql = `
			INSERT INTO grades(course_id, study_session_id, user_id, grade, anonymous)
			VALUES (?, ?, ?, ?, ?)`;
			var [results, _] = await db.query(sql, params);
			res.redirect(req.baseUrl + "?addResult=success");
		} catch (error) {
			console.log(error);
            if (error.code == "ER_DUP_ENTRY") {
				res.redirect(req.baseUrl + `?addResult=You already have a grade for module ${req.body.course_id}. You may edit existing grade`
				)
			}	
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
			let user = [req.user.id]
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
					WHERE users.id = ? ";
			var [results, _] = await db.query(sql, user);
			res.render("personal_grade.html", {user: req.user.name, res: results});

		} catch(error){
			console.log(error);
		}

	});
};
