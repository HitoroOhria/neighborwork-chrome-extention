import { areaName } from "./CalendarSelector";
import ReservationGridLattice from "./ReservationGridLattice";

export const reservationCellHeight = "22px";

type ReservationProps = {
  row: number;
  col: number;
};

export default function ReservationArea({ row, col }: ReservationProps) {
  return (
    <div style={{ gridArea: areaName.reservation }}>
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${row}, ${reservationCellHeight})`,
          gridTemplateColumns: `repeat(${col}, 1fr)`,
        }}
      >
        <ReservationGridLattice row={row} col={col} />
      </div>
    </div>
  );
}
