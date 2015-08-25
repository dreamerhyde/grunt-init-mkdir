/*
 * grunt-init-mkdir
 * https://gruntjs.com/
 *
 * Copyright (c) 2015 Albert Liu, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a basic Gruntfile.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'This template tries to structure your website project folders, ' +
  'you could put your sources into "src" folder which contents javascripts(js), ' +
  'images(img), stylesheets(css, sass). One more thing, you could also put your ' +
  'compressed files into "dist" folder if you want.';

// The actual init template.
exports.template = function(grunt, init, done) {
  // source file
  grunt.file.mkdir('src/js');
  grunt.file.mkdir('src/sass');
  grunt.file.mkdir('src/css');
  grunt.file.mkdir('src/img');
  // dist file
  grunt.file.mkdir('dist/js');
  grunt.file.mkdir('dist/css');
  // All done!
  done();
};