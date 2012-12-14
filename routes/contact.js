
/*
 * POST contact
 */

exports.submit = function(req, res) {

	var txt = [];
	txt.push(req.body.name+" wrote:\r\n\r\n");
	txt.push(req.body.message+"\r\n\r\n");
	txt.push("reply to: "+req.body.email);

	var message = {
	   from:    req.body.name+" <"+req.body.email+">",
	   to:      "Chris Finch <chrisfinchy@gmail.com>",
	   subject: "Contact form results from Overninethousand",
	   text: txt.join('')
	};

	// send the message and get a callback with an error or details of the message that was sent
	email.send(message, function(err, message) { console.log(err || message);
		if (err) {
			res.send(500, { error: err });
		} else {
			res.send(200);
		}
	});

};
