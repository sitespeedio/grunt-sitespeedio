'use strict'

exports.checkBudget = function(data, grunt) {
    // lets get the budget!
    grunt.log.ok('------------------------------------------------- Check budget');
    var failing = false;
    var includePassed = grunt.config.get('includePassed');
    var showFailedOnly = grunt.config.get('showFailedOnly');

    var noPassedTests = 0;
    var noFailingTests = 0;
    var noSkippedTests = 0;

    grunt.log.ok((includePassed ? 'Will include passing tests.' : 'Will not include passing tests.') +
        ' Change this by set grunt config to includePassed to true/false');

    data.budget.forEach(function(result) {
        if (result.skipped) {
            noSkippedTests++;
            if(!showFailedOnly)
                grunt.log.ok('Skipping ' + result.title + ' ' + result.url + ' ' + ' value [' + result.value +
                    ']');
        } else if (result.isOk) {
            noPassedTests++;
            if (includePassed && !showFailedOnly) {
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