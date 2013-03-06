
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
