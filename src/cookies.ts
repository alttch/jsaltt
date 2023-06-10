class Cookies {
  create(name: string, value: any, days?: number, path?: string) {
    if (typeof document === "undefined") return undefined;
    var p = path !== undefined ? path : "";
    var expires;
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = date.toUTCString();
    } else {
      expires = "";
    }
    document.cookie = `${name}=${value}; expires=${expires}; path=${p}`;
    return true;
  }
  read(name: string) {
    if (typeof document === "undefined") return undefined;
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  erase(name: string, path?: string) {
    return this.create(name, "", -1, path);
  }
}

const cookies = new Cookies();

export { cookies };
