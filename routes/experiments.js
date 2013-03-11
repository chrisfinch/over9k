/*
 * GET /experiments
 */

exports.index = function (req, res) {
	// Returns the index of experiments
	res.render('experiments-index');
};

/*
 * GET /experiments/:title
 */

// exports.get = function (req, res) {
// 	// Returns a specific experiment if found
// 	res.render('experiments/'+req.params.title+"/index");
// };
