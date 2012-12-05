$(function () {
	
	var h = $(window).height();

	sectionHeight(h);

	$(window).on('resize', function () {
		h = $(window).height();
		sectionHeight(h);
	});

	$('body').scrollspy();

});

var sectionHeight = function (h) {
	$('section').each(function () {
		$(this).css('minHeight', h);
	});
	$('[data-spy="scroll"]').each(function () {
		var $spy = $(this).scrollspy('refresh')
	});
}