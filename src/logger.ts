class Logger {
  colors: any;
  in_browser: boolean;
  can_colorize: boolean;

  css_debug = "font-size: 12px; color: #999";
  css_info = "font-size: 12px";
  css_warning = "font-size: 14px; color: orange; font-weight: bold";
  css_error = "font-size: 16px; color: red; font-weight: bold";
  css_critical = "font-size: 25px; color: red; font-weight: bold";

  constructor(colors_color_ts?: any) {
    this.colors = colors_color_ts;
    this.in_browser = typeof window !== "undefined";
    this.can_colorize = typeof this.colors !== "undefined" || this.in_browser;
  }

  _msg(css?: string, cf?: (m: any) => undefined, ...out: any[]) {
    if (true) {
      let result = [];
      if (cf) {
        out.map((m: any) => {
          if ((m && m.stack && m.message) || typeof m === "object") {
            result.push(m);
          } else {
            result.push(cf(m));
          }
        });
      } else {
        let msg;
        let can_colorize = css ? true : false;
        for (let i = 0; i < out.length; i++) {
          let m: any = out[i];
          if (
            !can_colorize ||
            (m && m.stack && m.message) ||
            typeof m === "object"
          ) {
            if (can_colorize) {
              can_colorize = false;
              result.push(msg);
              result.push(css);
            }
            result.push(m);
            msg = null;
          } else {
            msg ? (msg += " ") : (msg = "%c");
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
    console.info(null, out);
  }

  _log(
    log_fn: (...data: any[]) => void,
    css: string,
    cli_can_colorize_fn: (colors: any, out: string) => string,
    msgs: any[]
  ) {
    if (this.can_colorize) {
      const output = (out: string[]) => {
        if (out.length) {
          if (this.in_browser) {
            log_fn(`%c${out.join(" ")}`, css);
          } else if (this.colors) {
            log_fn(cli_can_colorize_fn(this.colors, out.join(" ")));
          }
          out.splice(0, out.length);
        }
      };
      let out: string[] = [];
      for (const msg of msgs) {
        if (typeof msg === "object") {
          output(out);
          log_fn(msg);
        } else {
          out.push(msg.toString());
        }
      }
      output(out);
    } else {
      log_fn.apply(null, msgs);
    }
  }
  _cli_can_colorize_debug(colors: any, out: string): string {
    return colors(out).gray.toString();
  }
  debug(...msgs: any[]) {
    this._log(
      console.debug,
      this.css_debug,
      this._cli_can_colorize_debug,
      msgs
    );
  }
  _cli_can_colorize_info(_colors: any, out: string): string {
    return out;
  }
  info(...msgs: any[]) {
    this._log(console.info, this.css_info, this._cli_can_colorize_info, msgs);
  }
  _cli_can_colorize_warninig(colors: any, out: string): string {
    return colors(out).yellow.bold.toString();
  }
  warning(...msgs: any[]) {
    this._log(
      console.warn,
      this.css_warning,
      this._cli_can_colorize_warninig,
      msgs
    );
  }
  _cli_can_colorize_error(colors: any, out: string): string {
    return colors(out).red.bold.toString();
  }
  _cli_can_colorize_critical(colors: any, out: string): string {
    return colors(out).red.underline.bold.toString();
  }
  error(...msgs: any[]) {
    this._log(
      console.error,
      this.css_error,
      this._cli_can_colorize_error,
      msgs
    );
  }
  critical(...msgs: any[]) {
    this._log(
      console.error,
      this.css_critical,
      this._cli_can_colorize_critical,
      msgs
    );
  }
  test() {
    let err = new Error("test error");
    this.debug("this is debug", "test", err, { a: "5" }, 123);
    this.info("this is info", "test", err, { a: "5" }, 123);
    this.warning("this is warning", "test", err, { a: "5" }, 123);
    this.error("this is error", "test", err, { a: "5" }, 123);
    this.critical("this is critical", "test", err, { a: "5" }, 123);
  }
}

export { Logger };
