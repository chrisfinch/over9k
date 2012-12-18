
/*
 * GET posts/create.
 */

exports.create = function(req, res){

	switch (req.method) {
		case 'GET':
			res.render('projects/create', { title: 'Create' });
		break;
		case 'POST':

			if (req.files && req.files.image) { // Are they trying to upload an image?
				var tmp_path = "./" + req.files.image.path;
				target_path = "./public/uploads/" + req.files.image.name;
				fs.rename(tmp_path, target_path, function(err) { // Move image file
					if (err) throw err;
					fs.unlink(tmp_path, function() {
						if (err) throw err;
						req.body.image = target_path.replace('./public', '');
						var project = new models.project(req.body);
						project.save(function (err) {
							if (err) {
								// ?
							} else {
								// Saved!
								res.redirect('/');
							}
						});
					});
				});
			} else {
				var project = new models.project(req.body);
				project.save(function (err) {
					if (err) {
						// ?
					} else {
						// Saved!
						res.redirect('/');
					}
				});
			}

		break;
	}

};
