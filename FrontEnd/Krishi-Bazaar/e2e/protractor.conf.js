// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

<<<<<<< HEAD
const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter').SpecReporter;
=======
const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');
// let  SpecReporter  = require('jasmine-spec-reporter').SpecReporter;
>>>>>>> 0bd03ec05a4f7ad8afd56473433a011384d9b4be

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  // allScriptsTimeout: 11000,
  allScriptsTimeout: 150000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome'
  },
  directConnect: true,
  SELENIUM_PROMISE_MANAGER: false,
  baseUrl: 'http://localhost:4300/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 180000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: "pretty"
      }
    }));
  }
};