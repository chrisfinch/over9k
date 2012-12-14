
/*
 * GET posts/create.
 */

exports.create = function(req, res){

	switch (req.method) {
		case 'GET':
			res.render('posts/create', { title: 'Create' });
		break;
		case 'POST':

			if (req.files && req.files.image) {
				fs.readFile(req.files.image.path, function (err, data) {
				  var newPath = __dirname + "/uploads/"+req.files.image.name;
				  fs.writeFile(newPath, data, function (err) {
					req.body.image = newPath;
					var post = new models.post(req.body);
					post.save(function (err) {
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
				var post = new models.post(req.body);
				post.save(function (err) {
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
