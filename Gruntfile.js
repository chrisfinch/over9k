module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      compile: {
        options: {
          name: "main",
          baseUrl: "public/js",
          mainConfigFile: "public/js/main.js",
          out: "public/js/main-built.js"
        }
      }
    },
    exec: {
      commit_build: {
        cmd: "git add public/js/main-built.js; git ci -m 'commit r.js build file;'"
      }
    }
  });

  // Load the plugin
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-heroku-deploy');

  // Task(s).
  grunt.registerTask('deploy', ['requirejs', 'exec:commit_build', 'heroku-deploy']);

};
