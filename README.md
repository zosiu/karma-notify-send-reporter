# karma-notify-send-reporter

> Report test results using notify-send.

## Installation

```bash
npm install karma-notify-send-reporter
```

###

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    reporters: ['progress', 'notify-send'],
  });
};
```

You can pass list of reporters as a CLI argument too:
```bash
karma start --reporters notify-send,dots
```
