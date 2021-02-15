const checkAuth = require("../middlewares/checkAuth");
const checkPermission = require("../middlewares/checkPermission");
const { check, validationResult } = require("express-validator");

module.exports = function (app, passport) {
	app.get("/", async (req, res) => {
		try {
			let sql =
				"SELECT  m.id, m.title, m.grade, COUNT(g.course_id) AS 'submissions' \
								FROM modules_with_grades m \
								LEFT JOIN grades g \
								ON g.course_id = m.id\
								GROUP BY m.id\
								ORDER BY id ASC";

			var [results, _] = await db.query(sql);
			res.render("_index.html", {
				res: results,
				title: "Home",
			});
		} catch (error) {
			console.log(error);
		}
	});

	app.get("/home", async (req, res) => {
		try {
			let sql =
				"SELECT  m.id, m.title, m.grade, m.level, COUNT(g.course_id) AS 'submissions' \
								FROM modules_with_grades m \
								LEFT JOIN grades g \
								ON g.course_id = m.id\
								GROUP BY m.id\
								ORDER BY id ASC";

			var [results, _] = await db.query(sql);
			res.render("pages/home.html", {
				res: results,
				title: "Home",
				subtitle: "Welcome to Gradez",
			});
		} catch (error) {
			console.log(error);
		}
	});

	app.get("/addgrade", checkAuth, async (req, res) => {
		try {
			let sql = `SELECT c.* FROM courses c WHERE c.id NOT IN 
			(SELECT g.course_id FROM grades g WHERE g.user_id = ?)
			ORDER BY c.id ASC`;
			var [courses, _] = await db.query(sql, [req.user.id]);
			sql = "SELECT * FROM study_sessions ORDER BY id ASC";
			var [semesters, _] = await db.query(sql);
			res.render("pages/addgrade.html", {
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
			let sql = "SELECT * FROM ranked_grades WHERE course_id = ?";
			var [results, _] = await db.query(sql, id);
			results.forEach((row) => {
				if (row.anonymous) {
					row.name = "Anonymous";
					row.avatar_url = null;
				}
			});
			res.render("pages/module_leaderboard.html", {
				res: results,
				course_id: id,
				title: `Grades Leaderboard - ${id}`,
			});
		} catch (error) {
			console.log(error);
		}
	});

	app.get("/personal_grade", checkAuth, async (req, res) => {
		try {
			let user = [req.user.id];
			let grades_sql =
				"SELECT study_sessions.title AS session, grades.course_id,  \
					courses.title, courses.level, grades.id, grades.grade, grades.anonymous, grades.created_at\
					FROM grades \
					JOIN users \
					ON grades.user_id = users.id \
					JOIN study_sessions \
					ON study_sessions.id = grades.study_session_id \
					JOIN courses \
					ON courses.id = grades.course_id \
					WHERE users.id = ? ";
			let sessions_sql = "SELECT id, title FROM study_sessions";
			var [grades_results, _] = await db.query(grades_sql, user);
			var [sessions_results, _] = await db.query(sessions_sql);
			let cumulativeGrade = calculateCumulativeGrade(grades_results);
			let completionRate = calculateCompletionRate(grades_results);
			res.render("pages/personal_grade.html", {
				title: "Leaderboard - My grades",
				grades_res: grades_results,
				sessions_res: sessions_results,
				editResult: req.query.editResult,
				cumulativeGrade: cumulativeGrade,
				completionRate: completionRate,
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
			var anonymous = req.body.anonymous == "true" ? 1 : 0;
			var fields = [req.body.session, req.body.grade, anonymous, req.body.grade_id];
			var [results, _] = await db.query(sql, fields);
			res.redirect("/personal_grade" + "?editResult=success");
		} catch (error) {
			console.log(error);
			res.redirect("/personal_grade" + "?editResult=Grade was not edited. Something went wrong.");
		}
	});

	// Intiate slack authentication process
	app.get("/auth/slack", passport.authorize("slack"));

	// OAuth callback url used by Slack
	app.get(
		"/auth/slack/callback",
		passport.authenticate("slack", {
			failureRedirect: "/",
			failureFlash: "Slack login failed",
		}),
		(req, res) => {
			try {
				// Set cookie age to 7 days
				req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000;
				res.redirect("/home");
			} catch (error) {
				console.log(error);
			}
		}
	);

	app.get("/logout", (req, res) => {
		req.logout();
		res.redirect("/");
	});

	function calculateCumulativeGrade(grades) {
		let sumOfWeights = 0;
		let sumOfWeightedGrades = 0;
		for (let i = 0; i < grades.length; i++) {
			if (grades[i].level == 4) {
				grades[i].weight = 1;
			}
			if (grades[i].level == 5) {
				grades[i].weight = 3;
			}
			if (grades[i].level == 6) {
				grades[i].weight = 5;
			}

			// Increase the weight for the final project. It is worth double of a L6 module as it provides 30 credits, hence the weighting here is doubled
			if (grades[i].level == 6 && grades[i].course_id == "CM3070") {
				grades[i].weight = 10;
			}
		}

		for (let i = 0; i < grades.length; i++) {
			sumOfWeights += grades[i].weight;
			sumOfWeightedGrades += grades[i].grade * grades[i].weight;
		}

		return Math.round(sumOfWeightedGrades / sumOfWeights);
	}

	function calculateCompletionRate(grades) {
		let totalCredits = grades.length * 15;
		for (let i = 0; i < grades.length; i++) {
			if (grades[i].course_id == "CM3070") {
				totalCredits += 15;
			}
		}
		return Math.round((totalCredits / 360) * 100);
	}
};
