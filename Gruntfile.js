module.exports = function(grunt) {
  'use strict';

  var config = {};
  var tasks = [
    'grunt',
    'grunt-contrib-concat',
    'grunt-contrib-connect',
    'grunt-contrib-jshint',
    'grunt-contrib-uglify',
    'grunt-contrib-watch'
  ];

  // =============================================
  // concat
  config.concat = {
    options: {
      banner: app.banner
    },
    dist: {
      src: [
        'calculator/calculator.js'
      ],
      dest: 'dist/calculator.js'
    }
  };

  // =============================================
  // jshint
  config.jshint = {};
  config.jshint.options = {
    debug: true,
    sub: true
  };
  config.jshint.all = ['dist/calculator.js'];

  // =============================================
  // watch
  config.watch = {};
  config.watch.scripts = {
    files: ['calculator/**/*.js'],
    tasks: ['concat', 'jshint'],
    options: {
      spawn: false,
    }
  }
}
