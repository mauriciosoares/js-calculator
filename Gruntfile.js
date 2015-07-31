module.exports = function(grunt) {
  'use strict';

  var config = {};
  var tasks = [
    'grunt-contrib-concat',
    'grunt-contrib-connect',
    'grunt-contrib-jshint',
    'grunt-contrib-watch',
    'grunt-sass'
  ];

  // =============================================
  // connect
  config.connect = {};
  config.connect.server = {
    options: {
      base: 'public',
      port: 8000,
      hostname: '*'
    }
  }

  // =============================================
  // concat
  config.concat = {
    dist: {
      src: [
        'assets/js/calculator.js'
      ],
      dest: 'public/js/calculator.js'
    }
  };

  // =============================================
  // jshint
  config.jshint = {};
  config.jshint.options = {
    debug: true,
    sub: true
  };
  config.jshint.all = ['public/js/calculator.js'];

  // =============================================
  // watch
  config.watch = {};
  config.watch.js = {
    files: ['assets/js/**/*.js'],
    tasks: ['concat', 'jshint'],
    options: {
      spawn: false
    }
  };

  config.watch.sass = {
    files: ['assets/sass/**/*.sass'],
    tasks: ['sass'],
    options: {
      spawn: false,
      livereload: true
    }
  };

  // =============================================
  // sass
  config.sass = {
    options: {
      sourceMap: true
    },
    dist: {
      files: {
        'public/css/main.css': 'assets/sass/main.sass'
      }
    }
  };

  // loads all tasks
  tasks.forEach(grunt.loadNpmTasks);

  grunt.initConfig(config);

  grunt.registerTask('develop', ['connect', 'watch'])
}
