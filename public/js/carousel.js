define(['jquery', "use!modernizr"], function($, Modernizr) {

    var transformProp = Modernizr.prefixed('transform');

    function Carousel3D ( el ) {
      this.element = el;

      this.rotation = 0;
      this.panelCount = 0;
      this.totalPanelCount = this.element.children.length;
      this.theta = 0;

    }

    Carousel3D.prototype.modify = function() {

      var panel, angle, i;

      this.panelSize = this.element['offsetWidth'];
      this.rotateFn = 'rotateY';
      this.theta = 360 / this.panelCount;

      // do some trig to figure out how big the carousel
      // is in 3D space
      this.radius = Math.round( ( this.panelSize / 2) / Math.tan( Math.PI / this.panelCount ) );

      for ( i = 0; i < this.panelCount; i++ ) {
        panel = this.element.children[i];
        angle = this.theta * i;
        panel.style.opacity = 1;
        //panel.style.backgroundColor = 'hsla(' + angle + ', 100%, 50%, 0.8)';
        // rotate panel, then push it out in 3D space
        panel.style[ transformProp ] = this.rotateFn + '(' + angle + 'deg) translateZ(' + this.radius + 'px)';
      }

      // hide other panels
      for (  ; i < this.totalPanelCount; i++ ) {
        panel = this.element.children[i];
        panel.style.opacity = 0;
        panel.style[ transformProp ] = 'none';
      }

      // adjust rotation so panels are always flat
      this.rotation = Math.round( this.rotation / this.theta ) * this.theta;

      this.transform();

    };

    Carousel3D.prototype.transform = function() {
      // push the carousel back in 3D space,
      // and rotate it
      this.element.style[ transformProp ] = 'translateZ(-' + this.radius + 'px) ' + this.rotateFn + '(' + this.rotation + 'deg)';
      // var _this = this;
      // $(this.element).off('webkitTransitionEnd transitionend oTransitionEnd')
      //   .on('webkitTransitionEnd transitionend oTransitionEnd', function () {
      //     $(_this.element).find('.project').each(function (i, e) {
      //       var a = $(e).find('p').text();
      //       $(e).find('p').empty().html("LOL"+a);
      //     });
      //   });

    };

    var init = function() {

      var c = $("#project_carousel");
      //var cont = $("#prj_carousel_cont");

      //cont.css("height", cont.parent().innerHeight());

      var carousel = new Carousel3D( c[0] ),
          navButtons = document.querySelectorAll('#navigation_prj button');

      // populate on startup
      //carousel.panelCount = parseInt( panelCountInput.value, 10);
      carousel.panelCount = c.children().length;
      carousel.modify();

      var onNavButtonClick = function( event ){
        var increment = parseInt(event.target.getAttribute('data-increment'), 10);
        carousel.rotation += carousel.theta * increment * -1;
        carousel.transform();
      };

      for (var i=0; i < 2; i++) {
        navButtons[i].addEventListener( 'click', onNavButtonClick, false);
      }

      var print = function (obj) {
        var arr = [];
        for (var key in obj) {
          arr.push(key);
        }
        return arr.join(", ");
      };

      var touches = [],
          done = false;
      c.on("touchmove", function (e) {
        e.preventDefault();
        done = false;
        touches.push(e.originalEvent.touches[0].pageX);

        $(window).on("touchend", function (event) {
          if (!done) {
            done = true;
            var s = touches[0],
                e = touches[touches.length-2];

            if (Math.abs(s-e) > 60) { // Was it an actual swipe?
              if (s < e) { // Right
                carousel.rotation += carousel.theta * -1 * -1;
              } else { // left
                carousel.rotation += carousel.theta * 1 * -1;
              }
              carousel.transform();
            }
            touches = [];
          }

        });

       //endX.push(event.originalEvent.touches[0].pageX);
       // $(window).on("touchmove touchend", function (event) {
       //  event.preventDefault();

       //  var endX = [];

       //  switch (event.type) {
       //    case "touchmove":
       //      endX.push(event.originalEvent.touches[0].pageX);
       //    break;

       //    case "touchend":
       //      alert(endX.join(", "));
       //    break;
       //  }

       //});

      });



      setTimeout( function(){
        $('#prj_carousel_cont').addClass('ready');
      }, 0);

    };

    return init;
});
