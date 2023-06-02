import { CONSOLE_ENABLE } from "../util/global";
import { format } from "../util/tool";

export default class Logger {
  prefix: string = "log";
  temp: string | null = null;
  enable: boolean = CONSOLE_ENABLE;

  constructor(prefix: string) {
    prefix && (this.prefix = prefix);
  }

  alias(prefix: string) {
    this.temp = prefix;
    return this;
  }

  log(...contents: any[]) {
    const timestamp = new Date();

    CONSOLE_ENABLE &&
      console.log(
        [
          `%c[${(this.temp || this.prefix)
            .toUpperCase()
            .replace(/[\s]+/g, "_")}]`,
          ...contents,
          format(timestamp, "[⏱️YYYY-MM-dd HH:mm:ss.SSS]"),
        ].join(" "),
        "font-weight: bold; color: #bada55"
      );
  }
}
