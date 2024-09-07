import { areaName, minimumReservationDuration } from "./CalendarSelector";
import { reservationCellHeight } from "./ReservationArea";
import { latticeBorder } from "./ReservationGridLattice";

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

function formatToTimeString(time: number) {
  // 時間と分の計算
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  // ゼロ埋めを行い、2桁の文字列に変換
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  // "hh:mm" 形式の文字列を返す
  return `${formattedHours}:${formattedMinutes}`;
}
