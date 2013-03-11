/**
 * This project, as a one-pager, does not stricly need require.js
 * and could just as well have all the script lumped in one single
 * source file and might even execute slightly faster without the
 * require.js overhead, however I have adhered to the AMD principles
 * here for 2 reasons, firstly, I believe in the principles and
 * think that this is how script should be written and structured,
 * and secondly, to give an example of me using it to anyone
 * checking out the code of this site.
 */

require.config({
  paths: {
    jquery: 'vendor/jquery-1.8.2.min',
    bootstrap: 'vendor/bootstrap.min',
    use: 'vendor/use.min',
    modernizr: 'vendor/modernizr-2.6.2.min'
  },

  use: {
		"modernizr": {
			attach: "Modernizr"
		}
  }

});

require(["jquery",
	"logo",
	"title",
	"carousel",
	"contact",
	"sections",
	"navigation",
	"posts",
	"hash",
	"detect",
	"use!modernizr",
	"bootstrap"], function($, logo, title, carousel, contact, sections, navigation, posts, hash, detect, Modernizr) {

	$(function () { // DOM Load

		// Quick, error prone hack to find tablet orientation..
		Modernizr.addTest("orientation", function () {
			var w = $(window).width();
			if (Modernizr.touch && w < 768) {
				return "portrait";
			} else if (Modernizr.touch) {
				return "landscape";
			} else {
				return false;
			}
		});

		// Quick, error prone hack to find portrait display device
		Modernizr.addTest("portrait_device", function () {
			var w = $(window).width();
			if (Modernizr.orientation == "portrait" && w <= 320) {
				return "phone";
			} else if (Modernizr.orientation == "portrait" && w <= 1024 && w >= 768) {
				return "tablet";
			} else {
				return false;
			}
		});

		sections.init(function () {
      logo.init();
      title.init();
      $('#content').addClass('show');
    });

		// Kick some modules off
		detect.init();
		if (detect.browser !== "ie") {
			posts.init(); // Posts need to be ready before navigation for history
			navigation.init();
			hash.init();
			carousel.init();
			contact.init();
		}

		// Business or Pleasure?
		$('#switch .switch-input').on('change', function (event) {
			$('body').removeClass('business pleasure').addClass($(this).val());
			$(window).trigger('resize');
		});

		// Treat for curious folks
		if (console && console.log) {
			var msg = [];
			msg.push("No errors here! Interested in how this site works? Visit github at: http://github.com/chrisfinch/over9k \n\r");
			msg.push("Want to get in touch? Please use the contact form in the page - Thanks!");
			console.log(msg.join(""));
		}

	});

});
