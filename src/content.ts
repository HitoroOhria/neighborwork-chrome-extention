import { init as reserveBoothInit } from "./page/reserve_booth/index.";
import { init as bookingFormInit } from "./page/booking_form";

window.onload = function () {
  switch (location.pathname) {
    case "/reserve_booth/":
      reserveBoothInit();
      break;
    case "/booking-form/":
      bookingFormInit();
      break;
    default:
      console.warn("not match path of NEIGHBOR WORK Time Selector");
  }
};
