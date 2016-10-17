'use strict';

exports.checkBudget = (result, grunt) => {
  // lets get the budget!
  grunt.log.ok('------------------------------------------------- Check budget');
  const showFailedOnly = grunt.config.get('showFailedOnly');

  let noPassedTests = 0;
  let noFailingTests = 0;

  grunt.log.ok((showFailedOnly ? 'Will show only failing test.' : 'Show both failing and passing tests.') +
    ' Change this by set Grunt config showFailedOnly to true');

  if (!showFailedOnly) {
    for (const url of Object.keys(result.working)) {
      for (const budgetResult of result.working[url]) {
        grunt.log.ok('The budget for ' + budgetResult.type + '.' + budgetResult.metric + ' ' + url + ' passed [' + budgetResult.value +
          ']');
        noPassedTests += 1;
      }
    }
  }
  for (const url of Object.keys(result.failing)) {
    for (const budgetResult of result.failing[url]) {
      grunt.log.error('[FAILED] The budget for ' + budgetResult.type + '.' + budgetResult.metric + ' ' + url + ' failed. [' + budgetResult.value + ' limit ' + budgetResult.limitType + ' ' + budgetResult.limit + ']');
      noFailingTests += 1;
    }
  }

  grunt.log.ok('We got ' + noPassedTests + ' passing tests, ' + noFailingTests + ' failing');

  grunt.log.ok('------------------------------------------------- Finished checking budget');

  return noFailingTests > 0;
};
