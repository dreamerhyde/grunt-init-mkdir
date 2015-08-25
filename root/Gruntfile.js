/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({{% if (min_concat) { %}
    // Metadata.{% if (package_json) { %}
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
      ' * <%= pkg.title || pkg.author.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd h:mmtt") %>\n' +
      ' * <%= pkg.description %>\n' +
      ' *\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed MIT\n' +
      ' */\n',{% } else { %}
    meta: {
      version: '0.1.0'
    },
    banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '* http://PROJECT_WEBSITE/\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
      'YOUR_NAME; Licensed MIT */\n',{% } } %}
    // Task configuration.{% if (min_concat) { %}
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['{%= lib_dir %}/{%= file_name %}.js'],
        dest: 'dist/{%= file_name %}.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/{%= file_name %}.min.js'
      }
    },{% } %}
    jshint: {
      options: {
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['{%= lib_dir %}/**/*.js']
      }
    },{% if (compass) { %}
    compass: {
      dev: {
        options: {
          sassDir: '{%= lib_dir %}/sass',
          cssDir: '{%= lib_dir %}/css',
          imagesPath: '{%= lib_dir %}/css/images',
          noLineComments: false,
          force: true,
          outputStyle: 'expanded'
        }
      },
      dist: {
        options: {
          specify: ['{%= lib_dir %}/sass/{%= file_name %}.scss'],
          banner: '<%= banner %>',
          sassDir: '{%= lib_dir %}/sass',
          cssDir: '{%= lib_dir %}/css',
          imagesPath: '{%= lib_dir %}/css/images',
          noLineComments: true,
          force: true,
          outputStyle: 'compressed'
        }
      }
    },{% } %}{% if (injector) { %}
    injector: {
      dev: {
        files: (function() {
          var files = {};
          grunt.file.recurse('.', function(abspath, rootdir, subdir, filename) {
            if (!Boolean(subdir) && abspath.match(/.*\.(html|php)$/ig)) {
              files[filename] = ['{%= lib_dir %}/js/*.js', '{%= lib_dir %}/css/*.css'];
            }
          });
          return files;
        }())
      },
      dist: {
        files: (function() {
          var files = {};
          grunt.file.recurse('.', function(abspath, rootdir, subdir, filename) {
            if (!Boolean(subdir) && abspath.match(/.*\.(html|php)$/ig)) {
              files[filename] = ['{%= lib_dir %}/js/*.min.js', '{%= lib_dir %}/css/*.css'];
            }
          });
          return files;
        }())
      }
    },{% } %}
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test']
      }{% if (compass) { %},
      compass: {
        files: '{%= lib_dir %}/sass/*.scss',
        tasks: ['compass:dev']
      }{% } %}
    }
  });

  // These plugins provide necessary tasks.{% if (min_concat) { %}
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');{% } %}
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');{% if (compass) { %}
  grunt.loadNpmTasks('grunt-contrib-compass');{% } %}{% if (injector) { %}
  grunt.loadNpmTasks('grunt-injector');{% } %}

  // Default task.
  grunt.registerTask('default', ['jshint'{%= min_concat ? ", 'concat', 'uglify'" : "" %}{%= compass ? ", 'compass:dev'" : "" %}{%= injector ? ", 'injector:dev'" : "" %}]);
  // Release Task
  grunt.registerTask('release', ['jshint'{%= min_concat ? ", 'concat', 'uglify'" : "" %}{%= compass ? ", 'compass:dist'" : "" %}{%= injector ? ", 'injector:dist'" : "" %}]);

};
