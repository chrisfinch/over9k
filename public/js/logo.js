define(['jquery'], function($) {

	var logo = {};

	logo.$el = $('header h1 img');

	// Find Center point of element
	logo.rootX = logo.$el.offset().left + (logo.$el.width()/2);
	logo.rootY = logo.$el.offset().top + (logo.$el.height()/2);	

	logo.start = function () {
		this.track();
	};

	logo.track = function () {
		var _this = this;
		$(document).on('mousemove', function (e) {
			
			var offsetX = Math.abs(e.pageX > _this.rootX ? _this.rootX - e.pageX : e.pageX - _this.rootX);
			var offsetY = Math.abs(e.pageY > _this.rootY ? _this.rootY - e.pageY : e.pageY - _this.rootY);

			_this.pitch(offsetX, offsetY);
		});
	}

	logo.pitch = function (x, y) {
		//
	};

	return logo;

});
