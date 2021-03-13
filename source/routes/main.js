const checkAuth = require("../middlewares/checkAuth");
const checkPermission = require("../middlewares/checkPermission");
const { check, validationResult } = require("express-validator");

module.exports = function (app, passport) {
	app.get("/", (req, res) => res.redirect("/program-dashboard"));

	app.get("/program-dashboard", async (req, res) => {
		try {
			let sql =
				"SELECT  m.id, m.title, m.grade, m.level, COUNT(g.course_id) AS 'submissions' \
								FROM modules_with_grades m \
								LEFT JOIN grades g \
								ON g.course_id = m.id\
								GROUP BY m.id\
								ORDER BY id ASC";

			var [results, _] = await db.query(sql);
			res.render("pages/program-dashboard.html", {
				res: results,
				title: "Program Dashboard",
				subtitle: "Welcome to Gradez",
				userStats: await userStats(req.user ? req.user.id : null),
				programStats: await programStats()
			});
		} catch (error) {
			console.log(error);
		}
	});

	app.get("/add-grade", checkAuth, async (req, res) => {
		try {
			let sql = `SELECT c.* FROM courses c WHERE c.id NOT IN 
			(SELECT g.course_id FROM grades g WHERE g.user_id = ?)
			ORDER BY c.id ASC`;
			var [courses, _] = await db.query(sql, [req.user.id]);
			sql = "SELECT * FROM study_sessions ORDER BY id ASC";
			var [semesters, _] = await db.query(sql);
			res.render("pages/add-grade.html", {
				title: "Leaderboard - Add grade",
				heading: "Add grade",
				courseList: courses,
				semesterList: semesters,
				addResult: req.query.addResult,
				title: "Add Grade",
				subtitle: "Add your grade",
				userStats: await userStats(req.user ? req.user.id : null),
				programStats: await programStats()				
			});
		} catch (error) {
			console.log(error);
		}
	});

	app.post("/add-grade", checkAuth, checkPermission, async (req, res) => {
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
			let grades_sql = "SELECT * FROM ranked_grades WHERE course_id = ?";
			var [grades_results, _] = await db.query(grades_sql, id);
			let course_sql = "SELECT title FROM courses WHERE id = ?";
			var [course_results, _] = await db.query(course_sql, id);
			let title = course_results[0].title;
			grades_results.forEach((row) => {
				if (row.anonymous) {
					row.name = "Anonymous";
					row.avatar_url = "/assets/media/avatars/blank.png";
				}
			});
			res.render("pages/module_leaderboard.html", {
				res: grades_results,
				course: { id: id, title: title },
				title: `Leaderboard`,
				subtitle: `${id} - ${title}`,
				userStats: await userStats(req.user ? req.user.id : null),
				programStats: await programStats()				
			});
		} catch (error) {
			console.log(error);
		}
	});

	app.get("/personal_grade", checkAuth, async (req, res) => {
		try {
			let user = [req.user.id];
			let grades_sql =
				"SELECT study_sessions.title AS session, study_sessions.id as session_id, grades.course_id,  \
					courses.title, courses.level, grades.id, grades.grade, grades.anonymous, grades.created_at\
					FROM grades \
					JOIN users \
					ON grades.user_id = users.id \
					JOIN study_sessions \
					ON study_sessions.id = grades.study_session_id \
					JOIN courses \
					ON courses.id = grades.course_id \
					WHERE users.id = ? \
					ORDER by session_id";
			let sessions_sql = "SELECT id, title FROM study_sessions";
			var [grades_results, _] = await db.query(grades_sql, user);
			var [sessions_results, _] = await db.query(sessions_sql);
			let cumulativeGrade = calculateCumulativeGrade(grades_results);
			let completionRate = calculateCompletionRate(grades_results);
			res.render("pages/personal_grade.html", {
				title: "My Grades",
				grades_res: grades_results,
				semesterList: sessions_results,
				editResult: req.query.editResult,
				cumulativeGrade: cumulativeGrade,
				completionRate: completionRate,
				subtitle: grades_results.user,
				userStats: await userStats(req.user ? req.user.id : null),
				programStats: await programStats()				
			});
		} catch (error) {
			console.log(error);
		}
	});

	app.post("/edit-grade", checkAuth, checkPermission, async (req, res) => {
		try {
			let sql = "UPDATE grades \
					SET study_session_id = ?, \
					grade = ?, \
					anonymous = ? \
					WHERE id = ?";
			var anonymous = req.body.anonymous == "true" ? 1 : 0;
			var fields = [req.body.semester, req.body.grade, anonymous, req.body.grade_id];
			var [results, _] = await db.query(sql, fields);
			res.redirect("/personal_grade" + "?editResult=success");
		} catch (error) {
			console.log(error);
			res.redirect("/personal_grade" + "?editResult=Grade was not edited. Something went wrong.");
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

	app.get("/demo-login", async (req, res) => {
		try {
			var [demoUserRow, _] = await db.query("SELECT * FROM users WHERE id = 'U00000007'");

			// mimic authentication - add demo user to req and session
			req.user = { ...demoUserRow[0] };
			req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000;
			req.session.passport = { user: req.user.id };
			req.session.save(function (err) {});

			res.redirect("/program-dashboard");
		} catch (error) {
			console.log(error);
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
				res.redirect("/program-dashboard");
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

	async function userStats(user) {
		try {
			if (user==null) return null;
			let sql = `select * from user_grade_stats where user_id = ?`;
			var [userStats, _] = await db.query(sql, [user]);
		    sql = `select * from user_rank where user_id = ?`;
			var [userRank, _] = await db.query(sql, [user]);			
			stats = {
				rank: userRank[0].order_rank,
				percentile: userRank[0].percentile_rank,
				credits: userStats[0].total_credits,
				progress: userStats[0].progress,
				grades: userStats[0].total_grades,
				weightedGrade: userStats[0].weighted_grade,
				averageGrade: userStats[0].average_grade
			};
			return stats;
		} catch (error) {
			console.log(error);
		}
	}

	async function programStats() {
		try {
			let sqlAvg = `select * from average_grade_stats`;
			let sqlTop = `select * from top_grade_stats`;
			let sqlKpi = `select * from program_kpis`;
			var [avgStats, _] = await db.query(sqlAvg);
			var [topStats, _] = await db.query(sqlTop);
			var [kpiStats, _] = await db.query(sqlKpi);

			stats = {
				averageTotalCredits: avgStats[0].avg_total_credits,
				averageProgress: avgStats[0].avg_progress,
				averageTotalGrades: avgStats[0].avg_total_grades,
				averageWeightedGrade: avgStats[0].avg_weighted_grade,
				averageGrade: avgStats[0].avg_grade,
				topTotalCredits: topStats[0].top_total_credits,
				topProgress: topStats[0].top_progress,
				topTotalGrades: topStats[0].top_total_grades,
				topWeightedGrade: topStats[0].top_weighted_grade,
				topAverageGrade: topStats[0].top_grade,
				students: kpiStats[1].val,
				grades: kpiStats[0].val				
			};
			return stats;
		} catch (error) {
			console.log(error);
		}
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
