
/*
 * GET /posts/list
 */

exports.list = function (req, res) {
	// Returns an array of post id's
	models.post.find({}).sort({'date':-1}).execFind( function(err, data) {
		res.send(data.map(function (d) {
			return {id: d._id, title: d.title.replace(" ", "_")};
		}));
	});
};

exports.get = function (req, res) {

	// Returns a specific post if found
	models.post.findOne({
		_id: req.params.id
	}, function (err, data) {
		if (err) {
			res.send(404);
		} else {
			// res.send(data);
			res.render('post', { p: data });
		}
	});
};

// Method for search engine crawlers without js
// Renders the index page with the correct post in line
exports.get_google = function (req, res) {
	var posts;
	var projects;

	models.post.find({}).sort({'date':-1}).execFind( function(err, data) {

		posts = data;

		var the_post;
		var p = posts.filter(function (val, index, array) {
			//console.log("=============", val.title, "---", req.params.title.replace(/_+?/g, " "));
			if (val.title === req.params.title.replace(/_+?/g, " ")) {
				the_post = index;
				return true;
			}	else {
				return false;
			}
		});

		models.project.find(function (err, data) {
			projects = data;
			res.render('index', { posts: posts, the_post: the_post, projects: projects });
		});
	});
};
