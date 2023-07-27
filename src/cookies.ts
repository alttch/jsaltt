class Cookies {
  create(
    name: string,
    value: any,
    days?: number,
    path?: string,
    samesite = "Lax"
  ) {
    if (typeof document === "undefined") return undefined;
    let p = path !== undefined ? path : "";
    let expires;
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = date.toUTCString();
    } else {
      expires = "";
    }
    document.cookie = `${name}=${value}; Expires=${expires}; Path=${p}; SameSite=${samesite}`;
    return true;
  }
  read(name: string) {
    if (typeof document === "undefined") return undefined;
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
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
