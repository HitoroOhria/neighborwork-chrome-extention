import { areaName, minReservationDuration } from "./CalendarSelector";
import { reservationCellHeight } from "./ReservationArea";
import { latticeBorder } from "./ReservationGridLattice";
import { formatToTimeString } from "../../feature/time";

export const timeAreaWidth = "65px";

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
              gridRow: idx + 1,
              gridColumn: 1,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateRows: reservationCellHeight,
                gridTemplateColumns: "1fr 15px",
              }}
            >
              <div
                style={{ color: "#c4c4c4", position: "relative", top: "-10px" }}
              >
                {idx === 0 || idx % 2 === 1 ? "" : formatToTimeString(time)}
              </div>
              <div
                style={{
                  borderRight: latticeBorder,
                  borderBottom:
                    idx === reservationRow - 1 || idx % 2 === 0
                      ? undefined
                      : latticeBorder,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
