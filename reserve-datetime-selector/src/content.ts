import { booths } from "./feature/booth";
import {
  appendElementToTableAfter,
  makeOrigTableHidden,
} from "./feature/orig_table";
import { createRoot } from "react-dom/client";
import ReservationTBody from "./component/TimeSelector/ReservationTBody";
import CalendarSelector from "./component/CalendarSelector/CalendarSelector";

makeOrigTableHidden();
insertReactDom();

function insertReactDom() {
  const app = document.createElement("div");
  app.innerHTML = '<div id="app"></div>';
  appendElementToTableAfter(app);

  const root = createRoot(document.getElementById("app") as HTMLElement);
  // root.render(ReservationTBody({ booths }));
  root.render(CalendarSelector({ booths }));
}
