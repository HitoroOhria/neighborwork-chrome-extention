import { areaName } from "./CalendarSelector";
import { reservationCellHeight } from "./ReservationArea";
import { latticeBorder } from "./ReservationGridLattice";
import { formatToTimeString } from "../../feature/time";
import { minReservationDuration } from "../../feature/neighborWork";

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
            key={time}
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
              {/* 時間を上にズラして表示する */}
              <div
                style={{ color: "#c4c4c4", position: "relative", top: "-10px" }}
              >
                {/* 1番目の時間と "xx:30" の時間は表示しない */}
                {idx === 0 || idx % 2 === 1 ? "" : formatToTimeString(time)}
              </div>
              {/* 表から横に伸びる横線を 15px で表示する */}
              <div
                style={{
                  borderRight: latticeBorder,
                  // 最後と "xx:30" の時間は下線を表示しない
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
