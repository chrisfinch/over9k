/**
 * This require module handles the initialisation of the navigation
 * animated scrolling and the bootstrap scrollspy for nav item
 * hightlighting.
 */
define(['jquery'], function($) {

  var navigation = {
    init: function () {
      var offset = Modernizr.touch ? 78 : 48;
      $('body').scrollspy({
        offset: offset
      });

      $('nav li a').on('click', function (event) {
        event.preventDefault();
        var t = $($(this).attr('href')).offset().top;
        if (Modernizr.touch) t = t-76;
        $("html:not(:animated),body:not(:animated)").animate({'scrollTop':t}, 500);
      });
    }
  };

  return navigation;
});
