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
        'assets/js/button.js',
        'assets/js/screen.js',
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
  config.jshint.all = ['assets/js/*.js'];

  // =============================================
  // watch
  config.watch = {};
  config.watch.js = {
    files: ['assets/js/**/*.js'],
    tasks: ['jshint', 'concat'],
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
