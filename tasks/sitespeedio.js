/**
 * grunt-sitespeed.io (http://www.sitespeed.io)
 * Copyright (c) 2015, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */

'use strict';

module.exports = function(grunt) {

	grunt.registerMultiTask('sitespeedio', 'Analyze you sites performance', function() {

		var tmp = require('temporary');
		var dir = new tmp.Dir();

		var options = this.options({
			resultBaseDir: dir.path
		});

		var done = this.async();

		var Sitespeed = require('sitespeed.io/lib/sitespeed');
		var sitespeed = new Sitespeed();

		sitespeed.run(options, function(err, data) {

			// lets get the budget!
			if (data && data.budget) {

				grunt.log.ok('------------------------------------------------- Check budget');
				var failing = false;
				var includePassed = grunt.config.get('includePassed');

				grunt.log.ok((includePassed ? 'Will include passing tests.' : 'Will not include passing tests.') +
					' Change this by set grunt config to includePassed to true/false');

				data.budget.forEach(function(result) {

					if (result.skipped) {
						grunt.log.ok('Skipping ' + result.title + ' ' + result.url + ' ' + ' value [' + result.value + ']');
					} else if (result.isOk) {

						if (includePassed) {
							grunt.log.ok('The budget for ' + result.title + ' ' + result.url + ' passed [' + result.value + ']');
						}
					} else {
						failing = true;
						grunt.log.error('The budget for ' + result.title + ' ' + result.url + ' failed. ' + result.description);
					}
				});

				grunt.log.ok('------------------------------------------------- Finished checking budget');

				if (failing) {
					done(false);
				} else {
					done();
				}
			}
		});
	});
};
