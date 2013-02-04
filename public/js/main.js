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

require(["jquery", "logo", "title", "carousel", "use!modernizr", "bootstrap"], function($, logo, title, carousel, Modernizr) {

	var sectionHeight = function (h, cb) {

		$('section').each(function () {
			$(this).css('minHeight', h-( parseInt($(this).css('paddingTop'), 10) + parseInt($(this).css('paddingBottom'), 10) ));
		//$('#lol').html(h + ' / ' + parseInt($(this).css('paddingTop'), 10) + ' / ' + parseInt($(this).css('paddingBottom'), 10) );
		});
		$('[data-spy="scroll"]').each(function () {
			var $spy = $(this).scrollspy('refresh');
		});
		if (cb) cb();
	};

	/* form handlers */
	_form = {

		doDefaultValues : function ($form) {
			$form.find('.text').each(function (i, e) {
				var $e = $(e);
				if (typeof $e.data('val') == 'undefined') {
					$e.data('val', $e.val());
				}
			});
			$form.find('.text').on('focus', function () {
				var $e = $(this);
				if ($e.val() == $e.data('val')) {
					$e.val('');
				}
				$e.on('blur', function () {
					if ($e.val() === '') {
						$e.val($e.data('val'));
					}
				});
			});
		},

		gatherForm : function ($form) {
			var d = {};
			$form.find('.text,.chkbx').each(function (i, e) {
				if ($(this).hasClass('chkbx')) d[$(e).attr('name')] = $(e).attr('checked');
				else d[$(e).attr('name')] = $(e).val();
			});
			return d;
		},

		tidy : function ($form) {
			$form.find('.text,.chkbx').each(function (i, e) {
				$(this).val($(this).data('val'));
			});
		},

		validateForm : function ($form) {
			var valid = true,
				invalid = [];
			$form.find('.text').each(function (i, e) {
				var $e = $(e);
				$e.removeClass('invalid');
				if ($e.data('required') == 'required' && ($e.val() === '' || $e.val() == $e.data('val'))) {
					valid = false;
					$e.addClass('invalid');
					invalid.push($e);
				}
				if ($e.attr('id') == 'email' && $e.val() !== '' && $e.val() != $e.data('val')) {
					var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					var test = re.test($e.val());
					if (!test) {
						valid = false;
						$e.addClass('invalid');
						invalid.push($e);
					}
				}
			});

			if (valid) {
				return valid;
			} else {
				return invalid;
			}
		}
	};

	$(function () {

		var h = $(window).height();

		sectionHeight(h, function () {
			logo.start();

			title.start();

			$('#content').addClass('show');

		});



		$(window).on('resize', function () {
			h = $(window).height();
			sectionHeight(h);
		});

		var offset = Modernizr.touch ? 81 : 48;
		$('body').scrollspy({
			offset: offset
		});

		var $contact = $('#contact form');

		_form.doDefaultValues($contact);

		$contact.on('submit', function (event) {
			event.preventDefault();
			$('#loader').show();
			if ( _form.validateForm($contact) ) {
				$.post('/contact', _form.gatherForm($contact))
					.done(function () {
						$('#loader').hide();
						$('.alert-success').slideDown();
						_form.tidy($contact);
					})
					.fail(function () {
						$('#loader').hide();
						$('.alert-error').slideDown();
					});
			}
		});

		$('nav li a').on('click', function (event) {
			event.preventDefault();
			var t = $($(this).attr('href')).offset().top;
			if (Modernizr.touch) t = t-80;
			$("html:not(:animated),body:not(:animated)").animate({'scrollTop':t}, 500);
		});


		// Business or Pleasure?
		$('#switch .switch-input').on('change', function (event) {
			$('body').removeClass('business pleasure').addClass($(this).val());
			$(window).trigger('resize');
		});

		// Carousel
		carousel();

		// Treat for curious folks
		if (console && console.log) {
			var msg = [];
			msg.push("No errors here! Interested in how this site works? Visit github at: http://github.com/chrisfinch/over9k \n\r");
			msg.push("Want to get in touch? Please use the contact form in the page - Thanks!");
			console.log(msg.join(""));
		}

	});

});
