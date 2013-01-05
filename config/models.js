/**
 * Mongoose Models for mongoDb.
 */

exports.user = db.model("user", schemas.user);
exports.post = db.model('Post', schemas.post);
exports.project = db.model('Project', schemas.project);
