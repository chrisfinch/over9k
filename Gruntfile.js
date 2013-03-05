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
    less: {
      development: {
        options: {
          paths: ["assets/css"]
        },
        files: {
          "path/to/result.css": "path/to/source.less"
        }
      },
      production: {
        options: {
          yuicompress: true
        },
        files: {
          "pulic/css/style-min.css": "pulic/css/style.less"
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
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('less', ['less:production']);

  // Task(s).
  grunt.registerTask('deploy', ['requirejs', 'less:production', 'exec:commit_build', 'exec:heroku_deploy']);

};
