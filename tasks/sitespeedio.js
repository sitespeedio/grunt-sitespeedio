/**
 * grunt-sitespeed.io (http://www.sitespeed.io)
 * Copyright (c) 2015, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */

'use strict';

var fs = require('fs'),
  path = require('path'),
  EOL = require('os').EOL,
  budget = require('./lib/budget');

module.exports = function(grunt) {

  grunt.registerMultiTask('sitespeedio', 'Analyze your sites web performance', function() {

    var tmp = require('temporary');
    var dir = new tmp.Dir();

    var options = this.options({
      resultBaseDir: dir.path,
      html: true
    });

    // special handling for reading file with urls
    // in sitespeed.io we read the file within the cli,
    // so we need to do it from outside when we run without the
    // cli
    if (options.file) {
      readFile(options);
    }

    var done = this.async();
    var Sitespeed = require('sitespeed.io/lib/sitespeed');
    var sitespeed = new Sitespeed();

    sitespeed.run(options, function(err, data) {

      if (err) {
        done(false);
      } else if (data && data.budget) {
        var isFailing = budget.checkBudget(data, grunt);
        if (isFailing) {
          done(false);
        } else {
          done();
        }
      } else {
        done();
      }
    });
  });
};

function readFile(options) {

  // absoulute or relative
  var fullPathToFile = (options.file.charAt(0) === path.sep) ? options.file : path.join(process.cwd(),
    path.sep, options.file);

  var data = fs.readFileSync(fullPathToFile);
  var urls = data.toString().split(EOL);
  urls = urls.filter(function(l) {
    return l.length > 0;
  });
  // we clean the file in the config to make
  // it look that we are feeding with URL array
  options.urls = urls;
  options.file = undefined;
}
