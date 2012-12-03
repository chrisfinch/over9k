
/*
 * GET home page.
 */

exports.index = function(req, res){
	var posts;
	var projects;

	models.post.find(function (err, data) {
		posts = data;

		models.project.find(function (err, data) {
			projects = data;
			res.render('index', { posts: posts, projects: projects });
		});
	});

};
