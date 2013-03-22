/**
 * This require module handles the initialisation of the navigation
 * animated scrolling and the bootstrap scrollspy for nav item
 * hightlighting.
 */
define(["jquery", "use!modernizr", "hash"], function($, Modernizr, hash) {

  var navigation = {

    $navs: $('#navigation nav li'),

    /**
     * Set up a click event on the navigation that scrolls the
     * document to the correct location so that the desired section
     * is flush with the top of the viewport.
     */
    init: function () {
      var that = this;

      // Initialise History API through Hash object..
      hash.onHistoryChange.push(function (page) {
        if (page.split("posts/").length > 1) page = "#sect_posts";
        var $link = $("#navigation nav ul li a").filter(function (i, e) {
          return $(e).attr("href") === page;
        });
        if ($link.length > 0) navigation.scrollTo($(page), $link);
      });

      // Bind navigation items
      this.$navs.find("a").not(".exp").on('click', function (event) {
        event.preventDefault();
        var href = $(this).attr('href');
        var $sect = $(href);
        hash.update(href); // Update history
        that.scrollTo($sect, $(this)); // Scroll DOM
      });
    },

    scrollTo: function ($sect, $link) {
      var t = $sect.position().top, a;
      if (Modernizr.touch) {
        if (Modernizr.orientation == "portrait" && Modernizr.portrait_device == "tablet") { // Tablet
          a = 76;t = t-a;
        } else if (Modernizr.orientation == "portrait" && Modernizr.portrait_device == "phone") { // Phone
          a = 70;t = t-a;
        }
      } else {
        $("html:not(:animated),body:not(:animated)").scrollTop(0);
      }
      $("#frame").animate({top:t*-1}, 500);
      $("#content").css({
        height: parseInt($sect.css('height'), 10)+a
      });
      this.$navs.removeClass("active");
      $link.parent().addClass("active");
      this.$activeSection = $sect;
      this.$activeLink = $link;
      this.$activeSection.trigger("inView");
    }
  };

  return navigation;
});
