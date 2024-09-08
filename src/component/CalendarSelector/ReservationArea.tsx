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
    startRAreaCellNumber,
    endRAreaCellNumber,
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
        {/* テーブルの格子(枠線) */}
        <ReservationGridLattice row={row} col={col} />
        {/* テーブルのセル */}
        <ReservationGridTable
          row={row}
          col={col}
          onDragStart={handleTableCellDragging}
          onDragOver={handleTableCellDragging}
          onDragEnd={handleTableCellDragEnd}
          onClick={handleTableCellClick}
        />
        {/* 予約済みのエリア表示 */}
        <ReservationGridReservedAreas />
        {/* ドラッグした予約エリア */}
        <ReservationGridReservationArea
          variant={"reservation"}
          startCellNumber={startRAreaCellNumber}
          endCellNumber={endRAreaCellNumber}
          rowReverse={reverse}
        >
          <ReservationGridReservationAreaTime
            startCellNumber={startRAreaCellNumber}
            endCellNumber={endRAreaCellNumber}
            rowReverse={reverse}
          />
        </ReservationGridReservationArea>
      </div>
    </div>
  );
}
