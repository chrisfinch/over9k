/**
 * This require module handles the initialisation of the navigation
 * animated scrolling and the bootstrap scrollspy for nav item
 * hightlighting.
 */
define(['jquery', "use!modernizr"], function($, Modernizr) {

  var navigation = {

    /**
     * Set up the bootstrap scrollspy and bind a click event to the
     * navigation that scrolls the document to the correct location
     * so that the desired section is flush with the top of the
     * viewport.
     */
    init: function () {
      $('body').scrollspy({
        offset: (Modernizr.orientation == "portrait" ? 78 : 48)
      });
      $('nav li a').on('click', function (event) {
        event.preventDefault();
        var t = $($(this).attr('href')).offset().top;
        if (Modernizr.orientation == "portrait" && Modernizr.portrait_device == "tablet") { // Tablet
            t = t-76;
        } else if (Modernizr.orientation == "portrait" && Modernizr.portrait_device == "phone") { // Phone
            t = t-68;
        }
        $("html:not(:animated),body:not(:animated)").animate({'scrollTop':t}, 500);
      });
    }
  };

  return navigation;
});
