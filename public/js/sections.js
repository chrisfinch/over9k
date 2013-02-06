define(['jquery'], function($) {

  var sections = {
    init: function (done) {
      var _this = this,
          h = $(window).height();
      _this.sectionHeight(h, done);
      $(window).on('resize', function () {
        h = $(window).height();
        _this.sectionHeight(h);
      });
    },

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
