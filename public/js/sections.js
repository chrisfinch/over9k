define(['jquery', "use!modernizr"], function($, Modernizr) {

  var sections = {
    init: function (done) {
      var _this = this,
          h = $(window).height();
      //_this.setContentWidth();
      _this.sectionHeight(h, done);
      $(window).on('resize', function () {
        h = $(window).height();
        h = h > 700 ? h : 700; // Minimum to avoid things getting too squashed
        _this.sectionHeight(h);
      });
    },

    // setContentWidth: function () {
    //   if (Modernizr.orientation == "landscape") {
    //     var w = $(window).width();
    //     var nav_w = $("#navigation").outerWidth(true);
    //     $("#content").css({
    //       "width": w-nav_w,
    //       "marginLeft": nav_w
    //     });
    //   }
    // },

    /**
     * Set the min-height of each of the sections to ensure full
     * screen transitions per section for a nice navigation
     * experience and execute a call back once its done
     * @param  {Integer}   h  The height of the window
     * @param  {Function} cb Callback function
     */
    sectionHeight: function (h, cb) {
      $('section').each(function () {
        $(this).css('minHeight', h-( parseInt($(this).css('paddingTop'), 10) + parseInt($(this).css('paddingBottom'), 10) ));
      });
      $('[data-spy="scroll"]').each(function () {
        var $spy = $(this).scrollspy('refresh');
      });
      if (cb) cb();
    }
  };

  return sections;
});
