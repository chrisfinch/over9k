/**
 * Mongoose Schemas for mongoDb.
 */
var md = require("node-markdown").Markdown;

exports.post = new mongoose.Schema({
	title: String,
	author: { type: String, default: 'Chris Finch'},
	date: { type: Date, default: Date.now },
	body: String
});

exports.post.methods.niceDate = function () {
	var d = [];
	d.push(this.date.getDate());
	d.push('/');
	d.push(this.date.getMonth()+1);
	d.push('/');
	d.push(this.date.getFullYear());
	return d.join('');
};

exports.post.methods.niceBody = function () {
	return md(this.body);
};

exports.project = new mongoose.Schema({
	title: String,
	client: String,
	url: String,
	image: { type: String, default: '/img/projects/default.jpeg' },
	desc: String
});

exports.project.methods.img = function (img, cb) {
	this.image = img;
};
