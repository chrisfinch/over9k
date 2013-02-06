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

      //this.panelSize = this.element['offsetWidth'];
      this.panelSize = this.element['offsetHeight'];
      //this.rotateFn = 'rotateY';
      this.rotateFn = 'rotateX';
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
    };

    var carousel = {
      init: function() {

        var c = $("#project_carousel");
        var carousel = new Carousel3D( c[0] ),
            navButtons = document.querySelectorAll('#navigation_prj button');

        // populate on startup
        carousel.panelCount = c.children().length;
        carousel.modify();

        if (Modernizr.touch) { // Touch Interfaces
          $("#navigation_prj").hide();
          var touches = [],
              done = false;
          c.on("touchmove", function (e) {
            e.preventDefault();
            done = false;
            touches.push(e.originalEvent.touches[0].pageY);

            $(window).on("touchend", function (event) {
              if (!done) {
                done = true;
                var s = touches[0],
                    e = touches[touches.length-2];

                if (Math.abs(s-e) > 60) { // Was it an actual swipe?
                  if (s < e) { // Up
                    carousel.rotation += carousel.theta * -1;
                  } else { // Down
                    carousel.rotation += carousel.theta * 1;
                  }
                  carousel.transform();
                }
                touches = [];
              }

            });

          });
        } else { // Desktop / Mouse interfaces
          var onNavButtonClick = function( event ){
            var increment = parseInt(event.target.getAttribute('data-increment'), 10);
            carousel.rotation += carousel.theta * increment * -1;
            carousel.transform();
          };

          for (var i=0; i < 2; i++) {
            navButtons[i].addEventListener( 'click', onNavButtonClick, false);
          }
        }

        setTimeout( function(){
          $('#prj_carousel_cont').addClass('ready');
        }, 0);

      }
    };

    return carousel;
});


    // var transformProp = Modernizr.prefixed('transform');

    // function Carousel3D ( el ) {
    //   this.element = el;

    //   this.rotation = 0;
    //   this.panelCount = 0;
    //   this.totalPanelCount = this.element.children.length;
    //   this.theta = 0;

    //   this.isHorizontal = true;

    // }

    // Carousel3D.prototype.modify = function() {

    //   var panel, angle, i;

    //   this.panelSize = this.element[ this.isHorizontal ? 'offsetWidth' : 'offsetHeight' ];
    //   this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
    //   this.theta = 360 / this.panelCount;

    //   // do some trig to figure out how big the carousel
    //   // is in 3D space
    //   this.radius = Math.round( ( this.panelSize / 2) / Math.tan( Math.PI / this.panelCount ) );

    //   for ( i = 0; i < this.panelCount; i++ ) {
    //     panel = this.element.children[i];
    //     angle = this.theta * i;
    //     panel.style.opacity = 1;
    //     panel.style.backgroundColor = 'hsla(' + angle + ', 100%, 50%, 0.8)';
    //     // rotate panel, then push it out in 3D space
    //     panel.style[ transformProp ] = this.rotateFn + '(' + angle + 'deg) translateZ(' + this.radius + 'px)';
    //   }

    //   // hide other panels
    //   for (  ; i < this.totalPanelCount; i++ ) {
    //     panel = this.element.children[i];
    //     panel.style.opacity = 0;
    //     panel.style[ transformProp ] = 'none';
    //   }

    //   // adjust rotation so panels are always flat
    //   this.rotation = Math.round( this.rotation / this.theta ) * this.theta;

    //   this.transform();

    // };

    // Carousel3D.prototype.transform = function() {
    //   // push the carousel back in 3D space,
    //   // and rotate it
    //   this.element.style[ transformProp ] = 'translateZ(-' + this.radius + 'px) ' + this.rotateFn + '(' + this.rotation + 'deg)';
    // };



    // var init = function() {


    //   var carousel = new Carousel3D( document.getElementById('carousel') ),
    //       panelCountInput = document.getElementById('panel-count'),
    //       axisButton = document.getElementById('toggle-axis'),
    //       navButtons = document.querySelectorAll('#navigation button'),

    //       onNavButtonClick = function( event ){
    //         var increment = parseInt( event.target.getAttribute('data-increment') );
    //         carousel.rotation += carousel.theta * increment * -1;
    //         carousel.transform();
    //       };

    //   // populate on startup
    //   carousel.panelCount = parseInt( panelCountInput.value, 10);
    //   carousel.modify();


    //   axisButton.addEventListener( 'click', function(){
    //     carousel.isHorizontal = !carousel.isHorizontal;
    //     carousel.modify();
    //   }, false);

    //   panelCountInput.addEventListener( 'change', function( event ) {
    //     carousel.panelCount = event.target.value;
    //     carousel.modify();
    //   }, false);

    //   for (var i=0; i < 2; i++) {
    //     navButtons[i].addEventListener( 'click', onNavButtonClick, false);
    //   }

    //   document.getElementById('toggle-backface-visibility').addEventListener( 'click', function(){
    //     carousel.element.toggleClassName('panels-backface-invisible');
    //   }, false);

    //   setTimeout( function(){
    //     document.body.addClassName('ready');
    //   }, 0);

    // };

    // window.addEventListener( 'DOMContentLoaded', init, false);
