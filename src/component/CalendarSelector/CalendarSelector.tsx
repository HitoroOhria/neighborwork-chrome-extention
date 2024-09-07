import { Booth, useBooth } from "../../feature/booth";
import { headerColStyle } from "../../feature/headerColStyle";
import HeaderArea from "./HeaderArea";
import TimeArea, { timeAreaWidth } from "./TimeArea";
import ReservationArea from "./ReservationArea";

const dayMinutes = 24 * 60;
export const minReservationDuration = 30;

export const areaName = {
  header: "headerArea",
  time: "timeArea",
  reservation: "reservationArea",
};

export default function CalendarSelector() {
  const { booths } = useBooth();

  const reservationRow = dayMinutes / minReservationDuration;
  const reservationCol = booths.length;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: `${headerColStyle.height} 1fr`,
        gridTemplateColumns: `${timeAreaWidth} 1fr`,
        gridTemplateAreas: `
        '.                ${areaName.header}'
        '${areaName.time} ${areaName.reservation}'
      `,
      }}
    >
      <HeaderArea booths={booths} />
      <TimeArea startTime={0} reservationRow={reservationRow} />
      <ReservationArea row={reservationRow} col={reservationCol} />
    </div>
  );
}
