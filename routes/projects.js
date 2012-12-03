
/*
 * GET posts/create.
 */

exports.create = function(req, res){

	switch (req.method) {
		case 'GET':
			res.render('projects/create', { title: 'Create' });
		break;
		case 'POST':
			var project = new models.project(req.body);

			project.img(req.body.img, function () {
				console.log('done', project);
			});

			project.save(function (err) {
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
