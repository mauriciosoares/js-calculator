module.exports = function(grunt) {
  'use strict';

  var config = {};
  var tasks = [
    'grunt-contrib-concat',
    'grunt-contrib-connect',
    'grunt-contrib-jshint',
    'grunt-contrib-watch',
    'grunt-contrib-jasmine',
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

  // =============================================
  // jasmine
  config.jasmine = {};
  config.jasmine.test = {
    src: [
      'public/js/vendor/jquery/dist/jquery.js',
      'public/js/calculator.js'
    ],
    options: {
      specs: 'tests/*Spec.js'
    }
  }

  // loads all tasks
  tasks.forEach(grunt.loadNpmTasks);

  grunt.initConfig(config);

  grunt.registerTask('develop', ['connect', 'watch'])
  grunt.registerTask('test', ['jasmine:test'])
}
