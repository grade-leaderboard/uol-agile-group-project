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

	// app.get("/", async (req, res) => {
	// 	try {
	// 		res.render("index.html", {});
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// });
};
