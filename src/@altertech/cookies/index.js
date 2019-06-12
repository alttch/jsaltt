'use strict';

(() => {
  function create_cookie(name, value, days, path) {
    if (typeof document === 'undefined') return undefined;
    var p = path !== undefined ? path : '';
    var expires;
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = date.toUTCString();
    } else {
      expires = '';
    }
    document.cookie = `${name}=${value}; expires=${expires}; path=${p}`;
    return true;
  }

  function read_cookie(name) {
    if (typeof document === 'undefined') return undefined;
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function erase_cookie(name, path) {
    return create_cookie(name, '', -1, path);
  }

  if (typeof exports === 'object') {
    exports.read = read_cookie;
    exports.create = create_cookie;
    exports.erase = erase_cookie;
  }

  if (typeof window !== 'undefined') {
    window.$cookies = {
      read: read_cookie,
      create: create_cookie,
      erase: erase_cookie
    };
  }
})();
