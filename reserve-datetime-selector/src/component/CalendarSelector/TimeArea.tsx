import { areaName, minReservationDuration } from "./CalendarSelector";
import { reservationCellHeight } from "./ReservationArea";
import { latticeBorder } from "./ReservationGridLattice";
import { formatToTimeString } from "../../feature/time";

export const timeAreaWidth = "50px";

type TimeAreaProps = {
  startTime: number;
  reservationRow: number;
};

export default function TimeArea({ startTime, reservationRow }: TimeAreaProps) {
  const times = Array(reservationRow)
    .fill(null)
    .map((_, idx) => {
      return startTime + idx * minReservationDuration;
    });

  return (
    <div style={{ gridArea: areaName.time }}>
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${reservationRow}, ${reservationCellHeight})`,
          gridTemplateColumns: timeAreaWidth,
        }}
      >
        {times.map((time, idx) => (
          <div
            style={{
              color: "#c4c4c4",
              borderTop: idx === 0 ? latticeBorder : undefined,
              borderRight: latticeBorder,
              borderBottom: idx % 2 === 0 ? undefined : latticeBorder,
              textAlign: "center",
              gridRow: idx + 1,
              gridColumn: 1,
            }}
          >
            {idx % 2 === 0 ? formatToTimeString(time) : ""}
          </div>
        ))}
      </div>
    </div>
  );
}
