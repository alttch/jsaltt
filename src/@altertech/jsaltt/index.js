'use strict';

const chalk = require('chalk');

function extend() {
  var extended = {};
  var deep = false;
  var i = 0;
  var length = arguments.length;
  if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
    deep = arguments[0];
    i++;
  }
  var merge = function(obj) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        if (
          deep &&
          Object.prototype.toString.call(obj[prop]) === '[object Object]'
        ) {
          extended[prop] = arguments.callee(true, extended[prop], obj[prop]);
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };
  for (; i < length; i++) {
    var obj = arguments[i];
    merge(obj);
  }
  return extended;
}

function cmp(a, b) {
  if (a === undefined || b === undefined) {
    return false;
  }
  var a_props = Object.getOwnPropertyNames(a);
  var b_props = Object.getOwnPropertyNames(b);
  if (a_props.length != b_props.length) {
    return false;
  }
  for (var i = 0; i < a_props.length; i++) {
    var prop_name = a_props[i];
    if (!Array.isArray(a[prop_name]) && a[prop_name] !== b[prop_name]) {
      return false;
    }
  }
  return true;
}

function in_process() {
  return typeof process !== 'undefined' && process.title != 'browser';
}

class Logging {
  constructor() {
    this.log = console.log;
    this.colored = true;
  }

  debug() {
    if (this.colored) {
      var msg = [];
      Array.from(arguments).map(function(m) {
        if ((m && m.stack && m.message) || typeof m === 'object') {
          msg.push(m);
        } else if (typeof chalk === 'undefined') {
          msg.push(`%c${m}`);
          msg.push('font-size: 12px; color: #999');
        } else {
          msg.push(chalk.gray(m));
        }
      });
    } else {
      var msg = Array.from(arguments);
    }
    console.log.apply(null, msg);
  }

  info() {
    if (this.colored) {
      var msg = [];
      Array.from(arguments).map(function(m) {
        if ((m && m.stack && m.message) || typeof m === 'object') {
          msg.push(m);
        } else if (typeof chalk === 'undefined') {
          msg.push(`%c${m}`);
          msg.push('font-size: 12px; color: black');
        } else {
          msg.push(m);
        }
      });
    } else {
      var msg = Array.from(arguments);
    }
    console.log.apply(null, msg);
  }

  warning() {
    if (this.colored) {
      var msg = [];
      Array.from(arguments).map(function(m) {
        if ((m && m.stack && m.message) || typeof m === 'object') {
          msg.push(m);
        } else if (typeof chalk === 'undefined') {
          msg.push(`%c${m}`);
          msg.push('font-size: 14px; color: orange');
        } else {
          msg.push(chalk.bold.yellow(m));
        }
      });
    } else {
      var msg = Array.from(arguments);
    }
    console.log.apply(null, msg);
  }

  error() {
    if (this.colored) {
      var msg = [];
      Array.from(arguments).map(function(m) {
        if ((m && m.stack && m.message) || typeof m === 'object') {
          msg.push(m);
        } else if (typeof chalk === 'undefined') {
          msg.push(`%c${m}`);
          msg.push('font-size: 14px; color: red');
        } else {
          msg.push(chalk.bold.red(m));
        }
      });
    } else {
      var msg = Array.from(arguments);
    }
    console.log.apply(null, msg);
  }

  critical() {
    if (this.colored) {
      var msg = [];
      Array.from(arguments).map(function(m) {
        if ((m && m.stack && m.message) || typeof m === 'object') {
          msg.push(m);
        } else if (typeof chalk === 'undefined') {
          msg.push(`%c${m}`);
          msg.push('font-size: 14px; color: red');
        } else {
          msg.push(chalk.bold.red(m));
        }
      });
    } else {
      var msg = Array.from(arguments);
    }
    console.log.apply(null, msg);
  }
}

if (typeof exports === 'undefined') {
  var exports = {};
  var jsaltt = exports;
}

exports.logger = new Logging();
exports.Logging = Logging;
exports.extend = extend;
exports.cmp = cmp;

if (typeof jsaltt !== 'undefined') exports = undefined;
