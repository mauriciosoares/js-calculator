module.exports = function(grunt) {
  'use strict';

  var config = {};
  var tasks = [
    'grunt-contrib-concat',
    'grunt-contrib-connect',
    'grunt-contrib-jshint',
    'grunt-contrib-uglify',
    'grunt-contrib-watch'
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
    files: ['assets/js/**/*.js'],
    tasks: ['concat', 'jshint'],
    options: {
      spawn: false,
    }
  };

  // loads all tasks
  tasks.forEach(grunt.loadNpmTasks);

  grunt.initConfig(config);

  grunt.registerTask('develop', ['connect', 'watch'])
}
