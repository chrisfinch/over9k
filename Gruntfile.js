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
        cmd: "git add public/js/main-built.js; git commit -m 'commit r.js build file'; git push"
      },
      heroku_deploy: {
        cmd: "git checkout deploy; git merge master; git commit -m 'Merge master>deploy'; git push; git checkout master"
      }
    }
  });

  // Load the plugin
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-exec');

  // Task(s).
  grunt.registerTask('deploy', ['requirejs', 'exec:commit_build', 'exec:heroku_deploy']);

};
