'use strict';

const sitespeed = require('sitespeed.io/lib/sitespeed');
const tmp = require('temporary');
const budget = require('./lib/budget');

module.exports = (grunt) => {
  grunt.registerMultiTask('sitespeedio', 'Analyze your sites web performance', function analyze() {
    const dir = new tmp.Dir();
    const options = this.options({
      outputFolder: dir.path
    });

    const done = this.async();

    sitespeed.run(options).then((result) => {
      if (result.errors.length > 0) {
        done(false);
      } else if (result.budgetResult) {
        const isFailing = budget.checkBudget(result.budgetResult, grunt);
        if (isFailing) {
          // we got failing!!
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
