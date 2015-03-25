'use strict';

var path = require('path'),
  grunt = require('grunt'),
  budget = require('../tasks/lib/budget'),
  hooker = require('hooker');


//Helper for testing stdout (from jshint: https://github.com/gruntjs/grunt-contrib-jshint/blob/master/test/jshint_test.js)
var stdoutEqual = function(callback, done) {
  var actual = '';
  // Hook process.stdout.write
  hooker.hook(grunt.log, ['error', 'ok'], {
    // This gets executed before the original process.stdout.write.
    pre: function(result) {
      // Concatenate uncolored result onto actual.
      actual += grunt.log.uncolor(result);
      // Prevent the original process.stdout.write from executing.
      return hooker.preempt();
    }
  });
  // Execute the logging code to be tested.
  callback();
  // Restore process.stdout.write to its original value.
  hooker.unhook(grunt.log, ['error', 'ok']);
  // Actually test the actually-logged stdout string to the expected value.
  done(actual);
};

function getSitespeedioResultData() {
  return {
    budget: [{
      skipped: false,
      title: 'foo',
      url: 'bar',
      value: 90,
      isOk: true
    }, {
      skipped: true,
      title: 'foo2',
      url: 'bar2',
      value: 90,
      isOk: false
    }, {
      skipped: false,
      title: 'foo2',
      url: 'bar2',
      value: 90,
      isOk: false
    }]
  }
}

exports.tests = {
  test_failed_result: function(test) {
    test.expect(1);
    stdoutEqual(function() {
      budget.checkBudget(getSitespeedioResultData(), grunt)
    }, function(result) {
      test.equal(result.indexOf('[FAILED]') !== -1, true, "Should print [FAILED] inside message when a result is not ok");
      test.done();
    });

  },
  test_showFailedOnly_switch: function(test) {
    test.expect(1);

    grunt.config.set("showFailedOnly", true);
    grunt.config.set("includePassed", true);

    stdoutEqual(function() {
      budget.checkBudget(getSitespeedioResultData(), grunt)
    }, function(result) {
      test.equal(result.indexOf('Skipped') == -1 && result.indexOf('passed') == -1, true, "Should not print any skipped or passed tests when showFailedOnly switch is set");
      test.done();
    });

  },
  test_includePassed_switch: function(test) {
    test.expect(1);
    grunt.config.set("showFailedOnly", false);
    grunt.config.set("includePassed", true);

    stdoutEqual(function() {
      budget.checkBudget(getSitespeedioResultData(), grunt)
    }, function(result) {
      test.equal(result.indexOf('Skipping') !== -1 && result.indexOf('passed') !== -1, true, "Should print skipped and passed tests when only includePassed switch is set");
      test.done();
    });

  }
};
