/**
 * This module handles the responsive resizing of the sites main
 * title so that it always fills a certain portion of the screen
 * area.
 */
define(['jquery', "use!modernizr"], function($, Modernizr) {

	var title = {
		$cont: $('#content'),
		$el: $('#home h1'),

		/**
		 * Using a while loop; clone the title and increase the clones
		 * font size until it reaches the target width, then copy over
		 * the required font size to the real title and remove the
		 * clone.
		 * @param  {Integer} width The desired width of the title
		 */
		resize: function (width) {
			var t = this;
			t.clone = t.$el.clone().css({
				'visibility': 'hidden',
				'font-size': 12
			}).insertAfter(t.$el);

			while (t.clone.width() < width) {
				var s = parseInt(t.clone.css('font-size'), 10);
				t.clone.css('font-size', s+1);
			}
			var size = parseInt(t.clone.css('font-size'), 10);
			t.$el.show().css({
				'font-size': size,
				'line-height': size
			});
			t.clone.remove();
			delete t.clone;
			t.position();
		},

		/**
		 * Make sure that the newly resized title is centered vertically
		 * in the screen.
		 */
		position: function () {
			var wh = $(window).height();
			var eh = this.$el.height();
			this.$el.css('top', (wh-eh)/2);
		},

		/**
		 * Execute the initla sizing of the title and bind a resize to
		 * the window resize event
		 */
		init: function () {
			//alert(Modernizr.orientation);
			var _this = this;
			_this.margin = Modernizr.orientation == "portrait" ? 48 : 278; // 230 for nav + 24px margin of error
			_this.resize($(window).width()-_this.margin);
			$(window).on('resize', function () {
				_this.resize($(window).width()-_this.margin);
			});
		}
	};

	return title;
});
