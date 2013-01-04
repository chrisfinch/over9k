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

      console.log(this.panelSize);

      // do some trig to figure out how big the carousel
      // is in 3D space
      this.radius = Math.round( ( this.panelSize / 2) / Math.tan( Math.PI / this.panelCount ) );

      console.log(this.panelCount);

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
          navButtons = document.querySelectorAll('#navigation_prj button'),

          onNavButtonClick = function( event ){
            var increment = parseInt( event.target.getAttribute('data-increment') );
            carousel.rotation += carousel.theta * increment * -1;
            carousel.transform();
          };

      // populate on startup
      //carousel.panelCount = parseInt( panelCountInput.value, 10);
      carousel.panelCount = c.children().length;
      carousel.modify();

      for (var i=0; i < 2; i++) {
        navButtons[i].addEventListener( 'click', onNavButtonClick, false);
      }

      setTimeout( function(){
        $('#prj_carousel_cont').addClass('ready');
      }, 0);

    };

    return init;
});
