var fs = require('fs');

/*
 * GET /admin
 */

exports.admin = function(req, res) {
	res.render('admin', {title: 'Admin - Over9k'});
};

/*
 * POST /posts/new
 */

exports.createPost = function(req, res){
	
	console.log(req);

	if (req.files && req.files.image && req.files.image.size > 0) {
		var tmp_path = "./" + req.files.image.path;
		target_path = "./public/uploads/" + req.files.image.name;
		fs.rename(tmp_path, target_path, function(err) { // Move image file
			if (err) throw err;
			fs.unlink(tmp_path, function() {
				if (err) throw err;
				req.body.image = target_path.replace('./public', '');
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
};

/*
 * POST /projects/new
 */

exports.createProject = function(req, res){

	console.log("gets here??", req.files);

	req.body.image = req.files.image.path.replace("https", "http");
	var project = new models.project(req.body);
	project.save(function (err) {
		if (err) {
			// ?
		} else {
			// Saved!
			res.redirect('/');
		}
	});
					
};

// exports.createUser = function(req, res){

// 	var pwd = require('pwd');

// 	var user = new models.user();

// 	console.log(req);

// 	pwd.hash(req.body.password, function (err, salt, hash) {

// 		if (err) {
// 			console.log(err);
// 		}

// 		user.salt = salt;
// 		user.hash = hash;
// 		user.username = req.body.username;
// 		user.save(function (err) {
// 			if (err) {
// 				// ?
// 			} else {
// 				// Saved!
// 				res.redirect('/admin');
// 			}
// 		});
// 	});

// };

exports.loginPage = function (req, res) {
	res.render('login');
};