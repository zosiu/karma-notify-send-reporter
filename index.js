var util = require('util');
var path = require('path');

var MSG_SUCCESS = '%d tests passed in %s.';
var MSG_FAILURE = '%d/%d tests failed in %s.';
var MSG_ERROR = 'something unexpected happened...';

var SUCCESS_ICON    = path.join(__dirname, 'images/nyan-success.jpg');
var SUCCESS_TITLE   = 'SUCCESS';
var SUCCESS_MESSAGE = '%d tests passed in %s.';

var FAIL_ICON       = path.join(__dirname, 'images/nyan-fail.jpg');
var FAIL_TITLE      = 'FAILURE';
var FAIL_MESSAGE    = '%d/%d tests failed in %s.';

var ERROR_ICON       = path.join(__dirname, 'images/nyan-error.jpg');
var ERROR_TITLE      = 'ERROR';
var ERROR_MESSAGE    = 'Something unexpected happened...';

var NotifySendReporter = function(helper, logger, config) {
  var log = logger.create('reporter.notify-send');

  var sys = require('sys')
  var exec = require('child_process').exec;

  function puts(error, stdout, stderr) {
    sys.puts(stdout);
  }

  function quote(str) {
    return '"' + str + '"';
  }

  function notifySend(title, body, urgency, icon) {
    var summary = quote(title);
    var message = quote(body);
    var pics    = quote(icon);
    var command = 'notify-send -u ' + urgency + ' -t 6000 -a karma -i ' + icon + ' ' + summary + ' ' + message;

    return exec(command, puts);
  }

  this.adapters = [];

  this.onBrowserComplete = function(browser) {
    var results = browser.lastResult;
    var time = helper.formatTimeInterval(results.totalTime);

    if (results.disconnected || results.error) {
      return notifySend(ERROR_TITLE, ERROR_MESSAGE, 'critical', ERROR_ICON);
    }

    if (results.failed) {
      return notifySend(FAIL_TITLE, util.format(FAIL_MESSAGE, results.failed, results.total, time), 'critical', FAIL_ICON);
    }

    return notifySend(SUCCESS_TITLE, util.format(SUCCESS_MESSAGE, results.success, time), 'normal', SUCCESS_ICON);
  };
};

NotifySendReporter.$inject = ['helper', 'logger','config.notifySendReporter'];

// PUBLISH DI MODULE
module.exports = {
  'reporter:notify-send': ['type', NotifySendReporter]
};
