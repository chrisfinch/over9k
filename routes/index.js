
/*
 * GET home page.
 */

exports.index = function(req, res){
	var posts;
	var projects;

	models.post.find({}).sort({'date':-1}).execFind( function(err, data) {

		posts = data;

		models.project.find(function (err, data) {
			projects = data;
			res.render('index', { posts: posts, the_post: 0, projects: projects });
		});
	});

};
