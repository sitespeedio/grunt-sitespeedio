/**
 * grunt-sitespeed.io (http://www.sitespeed.io)
 * Copyright (c) 2015, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */

'use strict';

var fs = require('fs'),
  path = require('path'),
  EOL = require('os').EOL;

module.exports = function(grunt) {

  grunt.registerMultiTask('sitespeedio', 'Analyze your sites web performance', function() {

    var tmp = require('temporary');
    var dir = new tmp.Dir();

    var options = this.options({
      resultBaseDir: dir.path,
      html: true
    });

    // special handling for reading file with urls
    if (options.file) {
      var fullPathToFile = (options.file.charAt(0) === path.sep) ? options.file : path.join(process.cwd(),
        path.sep, options.file);

      var data = fs.readFileSync(fullPathToFile);
      var urls = data.toString().split(EOL);
      urls = urls.filter(function(l) {
        return l.length > 0;
      });
      options.urls = urls;
      options.file = undefined;
    }

    var done = this.async();

    var Sitespeed = require('sitespeed.io/lib/sitespeed');
    var sitespeed = new Sitespeed();

    sitespeed.run(options, function(err, data) {

      // lets get the budget!
      if (data && data.budget) {

        grunt.log.ok('------------------------------------------------- Check budget');
        var failing = false;
        var includePassed = grunt.config.get('includePassed');

        var noPassedTests = 0;
        var noFailingTests = 0;
        var noSkippedTests = 0;

        grunt.log.ok((includePassed ? 'Will include passing tests.' : 'Will not include passing tests.') +
          ' Change this by set grunt config to includePassed to true/false');

        data.budget.forEach(function(result) {

          if (result.skipped) {
            noSkippedTests++;
            grunt.log.ok('Skipping ' + result.title + ' ' + result.url + ' ' + ' value [' + result.value +
              ']');
          } else if (result.isOk) {
            noPassedTests++;
            if (includePassed) {
              grunt.log.ok('The budget for ' + result.title + ' ' + result.url + ' passed [' + result.value +
                ']');
            }
          } else {
            noFailingTests++;
            failing = true;
            grunt.log.error('The budget for ' + result.title + ' ' + result.url + ' failed. ' + result.description);
          }
        });

        grunt.log.ok('We got ' + noPassedTests + ' passing tests, ' + noFailingTests + ' failing' + ((
          noSkippedTests > 0) ? ' ' + noSkippedTests + ' skipped tests' : '.'));

        grunt.log.ok('------------------------------------------------- Finished checking budget');

        if (failing) {
          done(false);
        } else {
          done();
        }
      }

      if (err) {
        done(false);
      } else {
        done();
      }
    });
  });
};
