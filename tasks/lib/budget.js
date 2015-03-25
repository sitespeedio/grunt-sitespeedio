/**
 * grunt-sitespeed.io (http://www.sitespeed.io)
 * Copyright (c) 2015, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
'use strict';

exports.checkBudget = function(data, grunt) {
	// lets get the budget!
	grunt.log.ok('------------------------------------------------- Check budget');
	var failing = false;
	var showFailedOnly = grunt.config.get('showFailedOnly');

	var noPassedTests = 0;
	var noFailingTests = 0;
	var noSkippedTests = 0;

	grunt.log.ok((showFailedOnly ? 'Will show only failing test.' : 'Show both failing and passing tests.') +
		' Change this by set Grunt config showFailedOnly to true');

	grunt.log.ok('the showFailedOnly is:' + showFailedOnly);

	data.budget.forEach(function(result) {
		if (result.skipped) {
			noSkippedTests++;
			if (!showFailedOnly)
				grunt.log.ok('Skipping ' + result.title + ' ' + result.url + ' ' + ' value [' + result.value +
					']');
		} else if (result.isOk) {
			noPassedTests++;
			if (!showFailedOnly) {
				grunt.log.ok('The budget for ' + result.title + ' ' + result.url + ' passed [' + result.value +
					']');
			}
		} else {
			noFailingTests++;
			failing = true;
			grunt.log.error('[FAILED] The budget for ' + result.title + ' ' + result.url + ' failed. ' + result.description);
		}
	});

	grunt.log.ok('We got ' + noPassedTests + ' passing tests, ' + noFailingTests + ' failing' + ((
		noSkippedTests > 0) ? ' ' + noSkippedTests + ' skipped tests' : '.'));

	grunt.log.ok('------------------------------------------------- Finished checking budget');

	return failing;
}
