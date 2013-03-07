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

      onHistoryChange: [],

      init: function () {
        var that = this;
        /**
         * On first load navigate to the correct page or push a
         * state for the home page.
         */
        if (window.location.hash.length) {
          var h, r, a;
          h = r = window.location.hash.replace("#", "");
          if (h.split("/").length > 1) {
            a = h.split("/")[0]; // Make sure we only get the page route
            r = "#"+r;
            that.navigate(a);
            that.navigate(h);
          } else {
            r = ref[h];
            that.navigate(h);
          }
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
        if (ref[hash]) {
          window.history.pushState({"page": ref[hash]}, ref[hash], "#"+ref[hash]);
        } else {
          window.history.pushState({"page": hash}, hash, "#"+hash);
        }
      },

      replace: function (hash) {
        window.history.replaceState({"page": hash}, hash, "#"+hash);
      },

      navigate: function (page) {
        /**
         * Because require.js prevents circular dependancies it is
         * neccasry to use this style of assigned callback functions
         * to have two way communication across modules.
         */
        if (this.onHistoryChange.length > 0) {
          var h = typeof ref[page] === "undefined" ? page : ref[page];
          for (var i = 0; i < this.onHistoryChange.length; i++) {
            this.onHistoryChange[i](h);
          }
        }
      }
    };
  })();
});
