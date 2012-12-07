require.config({
  paths: {
    jquery: 'vendor/jquery-1.8.2.min',
    bootstrap: 'vendor/bootstrap.min'
  }

});

require(["jquery", "bootstrap"], function($) {

	$(function () {
		
		var h = $(window).height();

		sectionHeight(h);

		$(window).on('resize', function () {
			h = $(window).height();
			sectionHeight(h);
		});

		$('body').scrollspy({
			offset: 48
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
			$("html:not(:animated),body:not(:animated)").animate({'scrollTop':t}, 500);
		});

	});

	var sectionHeight = function (h) {
		$('section').each(function () {
			$(this).css('minHeight', h);
		});
		$('[data-spy="scroll"]').each(function () {
			var $spy = $(this).scrollspy('refresh')
		});
	}

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
					if ($e.val() == '') {
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
				if ($e.data('required') == 'required' && ($e.val() == '' || $e.val() == $e.data('val'))) {
					valid = false;
					$e.addClass('invalid');
					invalid.push($e);
				}
				if ($e.attr('id') == 'email' && $e.val() != '' && $e.val() != $e.data('val')) {
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

});