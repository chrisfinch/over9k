/**
 * Small wrapper module for History API functionality used in the
 * page navigation.
 */
define(["jquery"], function ($) {

  return (function () {

    // Quick lookup object to prevent filtering the DOM every time
    var ref = {
      "#sect_home": "home",
      "#sect_posts": "posts",
      "#sect_about": "about",
      "#sect_projects": "projects",
      "#sect_contact": "contact",
      "home": "#sect_home",
      "posts": "#sect_posts",
      "about": "#sect_about",
      "projects": "#sect_projects",
      "contact": "#sect_contact"
    };

    return {

      init: function () {
        var that = this;
        /**
         * On first load navigate to the correct page or push a
         * state for the home page.
         */
        if (window.location.hash.length) {
          var h = window.location.hash.replace("#", "");
          that.update(ref[h]);
          that.navigate(h);
        } else {
          that.update("#sect_home");
        }
        window.onpopstate = function () {
          if (window.history.state && window.history.state.page) {
            that.navigate(window.history.state.page);
          }
        };
      },

      update: function (hash) {
        window.history.pushState({"page": ref[hash]}, ref[hash], "#"+ref[hash]);
      },

      navigate: function (page) {
        /**
         * Because require.js prevents circular dependancies it is
         * neccasry to use this style of assigned callback functions
         * to have two way communication across modules.
         */
        if (typeof this.onHistoryChange === "function") {
          this.onHistoryChange(ref[page]);
        }
      }
    };
  })();
});
