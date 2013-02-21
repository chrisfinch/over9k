/**
 * This require module handles the initialisation of the navigation
 * animated scrolling and the bootstrap scrollspy for nav item
 * hightlighting.
 */
define(['jquery', "use!modernizr"], function($, Modernizr) {

  var navigation = {

    $navs: $('nav li'),

    /**
     * Set up a click event on the navigation that scrolls the
     * document to the correct location so that the desired section
     * is flush with the top of the viewport.
     */
    init: function () {
      var that = this;
      this.$navs.find("a").on('click', function (event) {
        event.preventDefault();
        var $sect = $($(this).attr('href'));
        that.scrollTo($sect, $(this));
        // if (Modernizr.orientation == "portrait" && Modernizr.portrait_device == "tablet") { // Tablet
        //     t = t-76;
        // } else if (Modernizr.orientation == "portrait" && Modernizr.portrait_device == "phone") { // Phone
        //     t = t-68;
        // }
      });
    },

    scrollTo: function ($sect, $link) {
      var t = $sect.position().top;
      $("html:not(:animated),body:not(:animated)").scrollTop(0);
      $("#frame").animate({top:t*-1}, 500);
      $("#content").css({
        height: $sect.css("height")
      });
      this.$navs.removeClass("active");
      $link.parent().addClass("active");
      this.$activeSection = $sect;
      this.$activeLink = $link;
    }
  };

  return navigation;
});
