import { areaName, minReservationDuration } from "./CalendarSelector";
import ReservationGridLattice from "./ReservationGridLattice";
import ReservationGridTable from "./ReservationGridTable";
import ReservationGridReservationArea, {
  GridPosition,
} from "./ReservationGridReservationArea";
import { useState } from "react";
import ReservationGridReservedAreas from "./ReservationGridReservedAreas";
import { submitBookingForm } from "../../feature/bookingFrom";

export const reservationCellHeight = "22px";

const maxReserveDuration = 120;

type ReservationProps = {
  row: number;
  col: number;
};

export default function ReservationArea({ row, col }: ReservationProps) {
  const [startRAreaPosition, setStartRAreaPosition] = useState<
    GridPosition | undefined
  >(undefined);
  const [endRAreaPosition, setEndRAreaPosition] = useState<
    GridPosition | undefined
  >(undefined);

  function handleTableCellDragging(rowNum: number, colNum: number) {
    // 最初のドラッグ要素であれば、そのまま値をセットする
    if (startRAreaPosition === undefined) {
      setStartRAreaPosition({ rowNum, colNum });
      return;
    }

    // 既にドラッグ済みの要素と異なる列にはウィンドウを広げない
    if (startRAreaPosition.colNum !== colNum) {
      return;
    }
    // 最大予約可能数を選択済みであれば、それ以上はウィンドウを広げない
    const maxReserveCellCount = maxReserveDuration / minReservationDuration;
    const cellCount = Math.abs(startRAreaPosition.rowNum - rowNum) + 1;
    if (cellCount > maxReserveCellCount) {
      return;
    }

    setEndRAreaPosition({ rowNum, colNum });
  }

  async function handleTableCellDragEnd(reservationUrl: string) {
    if (startRAreaPosition === undefined || endRAreaPosition === undefined) {
      return;
    }

    const duration =
      (endRAreaPosition.rowNum - startRAreaPosition.rowNum + 1) *
      minReservationDuration;
    await submitBookingForm(reservationUrl, duration);
  }

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
        />
        <ReservationGridReservedAreas />
        <ReservationGridReservationArea
          variant={"reservation"}
          startGridPosition={startRAreaPosition}
          endGridPosition={endRAreaPosition}
        />
      </div>
    </div>
  );
}
