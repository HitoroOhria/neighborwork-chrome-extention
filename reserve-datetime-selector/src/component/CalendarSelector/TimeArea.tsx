import { areaName, minimumReservationDuration } from "./CalendarSelector";
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
      return startTime + idx * minimumReservationDuration;
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
              ...(idx === 0 ? { borderTop: latticeBorder } : {}),
              borderRight: latticeBorder,
              borderBottom: latticeBorder,
              textAlign: "center",
              gridRow: idx + 1,
              gridColumn: 1,
            }}
          >
            {formatToTimeString(time)}
          </div>
        ))}
      </div>
    </div>
  );
}
