import { useBooth } from "../../model/Booth";
import { headerColStyle } from "../../feature/headerColStyle";
import HeaderArea from "./HeaderArea";
import TimeArea, { timeAreaWidth } from "./TimeArea";
import ReservationArea from "./ReservationArea";
import { dayMinutes, minReservationDuration } from "../../feature/neighborWork";
import DateArea from "./DateArea";

// Grid エリアの名前
export const areaName = {
  date: "headerDate",
  header: "headerArea",
  time: "timeArea",
  reservation: "reservationArea",
};

export default function CalendarSelector() {
  const { booths } = useBooth();

  const reservationAreaRow = dayMinutes / minReservationDuration;
  const reservationAreaCol = booths.length;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: `${headerColStyle.height} 1fr`,
        gridTemplateColumns: `${timeAreaWidth} 1fr`,
        gridTemplateAreas: `
        '.                ${areaName.date}'
        '.                ${areaName.header}'
        '${areaName.time} ${areaName.reservation}'
      `,
      }}
    >
      <DateArea />
      <HeaderArea booths={booths} />
      <TimeArea startTime={0} reservationRow={reservationAreaRow} />
      <ReservationArea row={reservationAreaRow} col={reservationAreaCol} />
    </div>
  );
}
