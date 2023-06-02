import { CONSOLE_ENABLE } from "../util/global";
import { format } from "../util/tool";

export default class Logger {
  prefix: string = "log";
  temp: string | null = null;
  enable: boolean = CONSOLE_ENABLE;
  color: string = "#bada55";

  constructor(prefix: string, color?: string) {
    prefix && (this.prefix = prefix);

    if (color) {
      if (color?.match(/[a-z]+/g)) {
        this.color = color;
      } else {
        this.color = "#" + color;
      }
    }
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
        `font-weight: bold; color: ${this.color}`
      );
  }
}
