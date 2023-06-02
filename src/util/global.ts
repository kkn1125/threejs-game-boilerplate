export const MODE = import.meta.env.VITE_NODE_ENV === "development";
export const APP = document.body.querySelector("#app") as HTMLDivElement;
export const CONSOLE_ENABLE = MODE;
