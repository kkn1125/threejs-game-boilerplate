export const format = (time: Date | number | string, form: string) => {
  return form.replace(/YYYY|MM|dd|HH|mm|ss|SSS|AP/g, ($1: any) => {
    const timestamp = new Date(time);
    const year = timestamp.getFullYear();
    const month = timestamp.getMonth() + 1;
    const date = timestamp.getDate();
    const hour = timestamp.getHours();
    const minute = timestamp.getMinutes();
    const second = timestamp.getSeconds();
    const milliseconds = timestamp.getMilliseconds();
    const isOver12 = hour > 12;

    switch ($1) {
      case "YYYY":
        return year.toString().padStart(4, "0");
      case "MM":
        return month.toString().padStart(2, "0");
      case "dd":
        return date.toString().padStart(2, "0");
      case "HH":
        return hour.toString().padStart(2, "0");
      case "mm":
        return minute.toString().padStart(2, "0");
      case "ss":
        return second.toString().padStart(2, "0");
      case "SSS":
        return milliseconds.toString().padStart(3, "0");
      case "AP":
        return isOver12 ? "PM" : "AM";
      default:
        return $1;
    }
  });
};
