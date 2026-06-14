import { init as reserveBoothInit } from "./page/reserve_booth/index.";

window.onload = function () {
  switch (location.pathname) {
    case "/reserve_booth/":
      reserveBoothInit();
      break;
    default:
      console.warn("not match path of NEIGHBOR WORK Time Selector");
  }
};
