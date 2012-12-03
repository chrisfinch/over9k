
/*
 * GET posts/create.
 */

exports.create = function(req, res){

	switch (req.method) {
		case 'GET':
			res.render('posts/create', { title: 'Create' });
		break;
		case 'POST':
			var post = new models.post(req.body);
			post.save(function (err) {
				if (err) {
					// ?
				} else {
					// Saved!
					res.redirect('/');
				}
			});
		break;
	}

};
