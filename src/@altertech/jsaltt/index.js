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

  //msg.push('font-size: 12px; color: #999');
  //msg.push(chalk.gray(m));

  _msg(css, cf) {
    if (arguments.length > 2) {
      var out = [].slice.call(arguments, 2);
      if (this.colored) {
        var result = [];
        if (cf) {
          out.map(function(m) {
            if ((m && m.stack && m.message) || typeof m === 'object') {
              result.push(m);
            } else {
              result.push(cf(m));
            }
          });
        } else {
          var msg;
          var colorize = css ? true : false;
          for (var i = 0; i < out.length; i++) {
            var m = out[i];
            if (
              !colorize ||
              (m && m.stack && m.message) ||
              typeof m === 'object'
            ) {
              if (colorize) {
                colorize = false;
                result.push(msg);
                result.push(css);
              }
              result.push(m);
              msg = null;
            } else {
              msg ? (msg += ' ') : (msg = '%c');
              msg += m;
            }
          }
          if (msg) {
            result.push(msg);
            result.push(css);
          }
        }
        out = result;
      }
      console.log.apply(null, out);
    }
  }

  debug() {
    var css;
    var cf;
    typeof chalk === 'undefined'
      ? (css = 'font-size: 12px; color: #999')
      : (cf = chalk.gray);
    this._msg.apply(this, [css, cf].concat(Array.from(arguments)));
  }

  info() {
    var css;
    var cf;
    typeof chalk === 'undefined' ? (css = 'font-size: 12px; color: black') : {};
    this._msg.apply(this, [css, cf].concat(Array.from(arguments)));
  }

  warning() {
    var css;
    var cf;
    typeof chalk === 'undefined'
      ? (css = 'font-size: 14px; color: orange; font-weight: bold')
      : (cf = chalk.bold.yellow);
    this._msg.apply(this, [css, cf].concat(Array.from(arguments)));
  }

  error() {
    var css;
    var cf;
    typeof chalk === 'undefined'
      ? (css = 'font-size: 16px; color: red; font-weight: bold')
      : (cf = chalk.bold.red);
    this._msg.apply(this, [css, cf].concat(Array.from(arguments)));
  }

  critical() {
    var css;
    var cf;
    typeof chalk === 'undefined'
      ? (css = 'font-size: 25px; color: red; font-weight: bold')
      : (cf = chalk.bold.red);
    this._msg.apply(this, [css, cf].concat(Array.from(arguments)));
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
