'use strict';

module.exports = function(grunt) {

	/*var transport = require('grunt-cmd-transport');
	var style = transport.style.init(grunt);
	var script = transport.script.init(grunt);
	var text = transport.text.init(grunt);*/

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('seajs.json'),
    banner:
	    '/* ' +
	    '\nCopyright <%= grunt.template.today("yyyy")%>, QuickJS v1.0dev ' +
	    '\nMIT Licensed' +
	    '\nbuild time: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss")%> ' +
	    '\n*/' +
	    '\n',
    clean: {
      files: ['dist']
    },
    transport: {
        target: {
            options: {
                pkg: 'seajs.json',
	              alias: '<%= pkg.spm.alias %>',
	              idleading: 'gallery/<%= pkg.name %>/<%= pkg.version %>/'
            },
            files: [{
                cwd: 'src',
	              expand: true,
	              debug:false,
                src: ['**/*.js', '**/*.css'],
                dest: 'dist'
            }]
        }
    },
    concat: {
        options: {
            banner: '<%= banner %>',
            stripBanners: true
        },
        debug: {
            src: ['dist/*-debug.js'],
            dest: '../../dist/<%= pkg.name %>/<%= pkg.version %>/<%= pkg.name %>-debug.js'
        },
        dist: {
            src: ['dist/*.js', '!dist/*-debug.js'],
            dest: 'dist/concat/all.js'
        }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: '../../dist/<%= pkg.name %>/<%= pkg.version %>/<%= pkg.name %>.js'
      }
    },
    copy: {
      main: {
        files: [{
            expand: true,
            cwd: 'src/',
            src: ['**/*.css', '**/*.gif', '**/*.png', '**/*.jpg', '**/*.ico'],
            dest: '../../dist/<%= pkg.name %>/<%= pkg.version %>/',
            filter: 'isFile'
        }]
      }
    },

    // check
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  // Default task.
  grunt.registerTask('default', ['clean', 'transport', 'concat', 'uglify', 'copy']);
  grunt.registerTask('check', ['jshint', 'qunit']);

};
