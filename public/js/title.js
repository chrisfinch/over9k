define(['jquery'], function($) {

	var title = {};

	title.$cont = $('#content');
	title.$el = $('#home h1');
	title.margin = Modernizr.touch ? 48 : 278; // 230 for nav + 24px margin of error

	title.resize = function (width) {
		var t = this;
		t.clone = t.$el.clone().css({
			'visibility': 'hidden',
			'font-size': 12
		}).insertAfter(t.$el);

		while (t.clone.width() < width) {
			var s = parseInt(t.clone.css('font-size'), 10);
			t.clone.css('font-size', s+1);
		}

		t.$el.show().css('font-size', parseInt(t.clone.css('font-size'), 10));
		t.clone.remove();
		delete t.clone;
		t.position();
	};

	title.position = function () {
		var wh = $(window).height();
		var eh = this.$el.height();
		this.$el.css('top', (wh-eh)/2);
	};

	title.start = function () {
		var _this = this;
		_this.resize($(window).width()-_this.margin);
		$(window).on('resize', function () {
			_this.resize($(window).width()-_this.margin);
		});
	};

	return title;

});
