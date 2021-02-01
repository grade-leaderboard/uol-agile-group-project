const checkAuth = require("../middlewares/checkAuth");
const checkPermission = require("../middlewares/checkPermission");
const { check, validationResult } = require("express-validator");

module.exports = function (app) {
	app.get("/", async (req, res) => {
		try {
			console.log(req.user.name);
			let sql =
				"SELECT  m.id, m.title, m.grade, COUNT(g.course_id) AS 'submissions' \
								FROM modules_with_grades m \
								LEFT JOIN grades g \
								ON g.course_id = m.id\
								GROUP BY m.id\
								ORDER BY id ASC";

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
				title: "Leaderboard - Add grade",
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
			let params = [req.body.course_id, req.body.semester, req.user.id, req.body.grade, !!req.body.anonymous];
			let sql = `
			INSERT INTO grades(course_id, study_session_id, user_id, grade, anonymous)
			VALUES (?, ?, ?, ?, ?)`;
			var [results, _] = await db.query(sql, params);
			res.redirect(req.baseUrl + "?addResult=success");
		} catch (error) {
			console.log(error);
			if (error.code == "ER_DUP_ENTRY") {
				res.redirect(req.baseUrl + `?addResult=You already have a grade for module ${req.body.course_id}. You may edit existing grade`);
			}
		}
	});

	app.get("/module_leaderboard", checkAuth, async (req, res) => {
		try {
			id = [req.query.module_id];
			let sql =
				"SELECT username, grade, graderank, created_at, anonymous \
				FROM ( \
					SELECT users.name AS username, grades.grade AS grade, RANK() OVER w AS graderank, grades.created_at AS created_at, grades.course_id, grades.anonymous \
					FROM grades \
					JOIN users \
					ON grades.user_id = users.id \
					WHERE grades.course_id = ? \
					WINDOW w AS (ORDER BY grades.grade DESC) \
				) a \
				ORDER BY created_at \
				;"

				// "SELECT * FROM grade_rank_by_module WHERE course_id = ?";

			var [results, _] = await db.query(sql, id);
			results.forEach((row) => {
				if (row.anonymous) {
					row.username = "Anonymous";
				}
			});
			res.render("module_leaderboard.html", { res: results, course_id: id });
		} catch (error) {
			console.log(error);
		}
	});

	app.get("/personal_grade", checkAuth, async (req, res) => {
		try {
			let user = [req.user.id];
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
			res.render("personal_grade.html", { user: req.user.name, res: results });
		} catch (error) {
			console.log(error);
		}
	});

	app.get("/edit_grades", checkAuth, async (req, res) => {
		try {
			let grades_sql =
				"SELECT courses.id AS course_id, \
					courses.title AS course_title, \
					grades.id AS grade_id \
					FROM grades \
					JOIN users \
					ON grades.user_id = users.id \
					JOIN courses \
					ON courses.id = grades.course_id \
					WHERE users.name = ?";
			let sessions_sql = "SELECT id, title FROM study_sessions";
			var [grades_results, _] = await db.query(grades_sql, [req.user.name]);
			var [sessions_results, _] = await db.query(sessions_sql);

			res.render("edit_grades.html", {
				title: "Leaderboard - Edit grades",
				heading: "Edit grades",
				grades_res: grades_results,
				sessions_res: sessions_results,
				editResult: req.query.editResult,
			});
		} catch (error) {
			console.log(error);
		}
	});

	app.post("/edit_grades", checkAuth, checkPermission, async (req, res) => {
		try {
			let sql = "UPDATE grades \
					SET study_session_id = ?, \
					grade = ?, \
					anonymous = ? \
					WHERE id = ?";
			var anonymous = req.body.anonymous == "on" ? 1 : 0;
			var fields = [req.body.session, req.body.grade, anonymous, req.body.grade_id];
			var [results, _] = await db.query(sql, fields);
			res.redirect(req.baseUrl + "?editResult=success");
		} catch (error) {
			console.log(error);
			res.redirect(req.baseUrl + "?editResult=Grade was not edited. Something went wrong.");
		}
	});
};
