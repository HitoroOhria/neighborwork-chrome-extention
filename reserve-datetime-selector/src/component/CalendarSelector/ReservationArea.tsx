import { areaName } from "./CalendarSelector";
import ReservationGridLattice from "./ReservationGridLattice";
import ReservationGridTable from "./ReservationGridTable";
import ReservationGridReservationArea from "./ReservationGridReservationArea";
import ReservationGridReservedAreas from "./ReservationGridReservedAreas";
import ReservationGridReservationAreaTime from "./ReservationGridReservationAreaTime";
import { useReservationArea } from "../../feature/useReservationArea";

export const reservationCellHeight = "22px";

type ReservationProps = {
  row: number;
  col: number;
};

export default function ReservationArea({ row, col }: ReservationProps) {
  const {
    reverse,
    startRAreaPosition,
    endRAreaPosition,
    handleTableCellDragging,
    handleTableCellDragEnd,
    handleTableCellClick,
  } = useReservationArea();

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
        <ReservationGridTable
          row={row}
          col={col}
          onDragStart={handleTableCellDragging}
          onDragOver={handleTableCellDragging}
          onDragEnd={handleTableCellDragEnd}
          onClick={handleTableCellClick}
        />
        <ReservationGridReservedAreas />
        <ReservationGridReservationArea
          variant={"reservation"}
          startGridPosition={startRAreaPosition}
          endGridPosition={endRAreaPosition}
          rowReverse={reverse}
        >
          <ReservationGridReservationAreaTime
            startGridPosition={startRAreaPosition}
            endGridPosition={endRAreaPosition}
            rowReverse={reverse}
          />
        </ReservationGridReservationArea>
      </div>
    </div>
  );
}
