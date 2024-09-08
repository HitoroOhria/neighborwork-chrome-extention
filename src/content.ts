import { appendChildToMixAnchor, makeOrigTableHidden } from "./model/OrigTable";
import { createRoot } from "react-dom/client";
import CalendarSelector from "./component/CalendarSelector/CalendarSelector";

window.onload = function () {
  makeOrigTableHidden();
  insertReactDom();
};

function insertReactDom() {
  const app = document.createElement("div");
  app.innerHTML = '<div id="app"></div>';
  appendChildToMixAnchor(app);

  const root = createRoot(document.getElementById("app") as HTMLElement);
  // root.render(ReservationTBody({ booths }));
  root.render(CalendarSelector());
}
