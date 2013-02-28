/**
 * Handle ajaxy pagination of posts with a css3 transition animation
 * for display. This works because JS arrays have a guranteed order
 * and the order is maintained when the node post array is sent via
 * GET request from the backend to the client side.
 */
define(["jquery"], function ($) {

  var $el = $("section#posts"),
      _priv = (function () {

    var $next,
        $prev,
        $frame,
        $curr_post,
        $new_post,
        $curr_ind,
        list,
        width,
        counter,
        total,
        active = false;

    return {

      setup: function () {
        $next = $el.find("nav #next");
        $prev = $el.find("nav #prev");
        $frame = $el.find("#postFrame");
        $curr_post = $el.find(".post");
        $curr_ind = $el.find("nav .current");

        counter = 1;

        $el.height($curr_post.height()+72);

        $.getJSON("/posts/list", function (data) {
          total = data.length;
          list = data;
          _priv.bind();
        });

        width = $(window).width() - $frame.offset().left;

        $frame.css({
          width: $(window).width() - $frame.offset().left
        });

        $curr_post.css({
          left: $curr_post.position().left,
          width: width
        });
      },

      bind: function () {
        var that = this;
        $next.on("click", function (event) {
          event.preventDefault();
          if (!active) {
            active = true;
            that.next();
          }
        });
        $prev.on("click", function (event) {
          event.preventDefault();
          if (!active) {
            active = true;
            that.prev();
          }
        });
      },

      /**
       * With next() and prev(), use the array of post id's to
       * maintain post order and minipulate array to represent
       * position of posts in display.
       */
      next: function () {
        var that = this,
            old_id = list.shift(),
            new_id = list[0];

        var callback = function () {
          list.push(old_id);
          active = false;
        };

        /**
         * Rendering the template on the server and sending raw
         * HTMl is a little nasty but, for the sake of only this
         * functionality, including a whole client side templating
         * framework such as moustache or handlebars, or even worse,
         * manaipulating the individual DOM nodes via jQuery would
         * be a much larger hit on performance and file size on the
         * client side.
         */
        $.get("/posts/"+new_id, function (data) {
          that.displayNextPost(data, callback);
        });
      },

      prev: function () {
        var that = this,
            old_id = list[0],
            new_id = list.pop();

        var callback = function () {
          list.unshift(new_id);
          active = false;
        };

        $.get("/posts/"+new_id, function (data) {
          that.displayPrevPost(data, callback);
        });
      },

      // Some duplication with these two display methods - will refactor out at a later date...
      displayNextPost: function (post, callback) {
        $new_post = $(post);
        $frame.append($new_post.css({
          left: $curr_post.position().left - $curr_post.width(),
          width: width
        }));
        $new_post.css("left", $curr_post.position().left);
        $curr_post.css("left", $curr_post.position().left + $curr_post.width())
          .on("webkitTransitionEnd mozTransitionEnd msTransitionEnd transitionEnd", function (event) {
            $curr_post.remove();
            $curr_post = $new_post;
            callback();
            //$el.height($curr_post.height()+48);
            $("#content").add($el).height($curr_post.height()+72);
          });
        counter += 1;
        this.manageCounter();
      },

      displayPrevPost: function (post, callback) {
        $new_post = $(post);
        $frame.append($new_post.css({
          left: $curr_post.position().left + $curr_post.width(),
          width: width
        }));
        $new_post.css("left", $curr_post.position().left);
        $curr_post.css("left", $curr_post.position().left - $curr_post.width())
          .on("webkitTransitionEnd mozTransitionEnd msTransitionEnd transitionEnd", function (event) {
            $curr_post.remove();
            $curr_post = $new_post;
            callback();
          });
        counter -= 1;
        this.manageCounter();
      },

      manageCounter: function () {
        counter = counter < 1 ? 7 : counter;
        counter = counter > total ? 1 : counter;
        $curr_ind.html(counter);
      }
    };
  })();

  return {
    init: function () {
      _priv.setup();
    }
  };
});
