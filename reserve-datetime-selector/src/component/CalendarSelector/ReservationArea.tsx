import { areaName, minimumReservationDuration } from "./CalendarSelector";
import ReservationGridLattice from "./ReservationGridLattice";
import ReservationGridTable from "./ReservationGridTable";
import ReservationGridReservationArea, {
  GridPosition,
} from "./ReservationGridReservationArea";
import { useState } from "react";
import ReservationGridReservedAreas from "./ReservationGridReservedAreas";
import { clickBookingFormButton } from "../../feature/bookingFrom";

export const reservationCellHeight = "22px";

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

    setEndRAreaPosition({ rowNum, colNum });
  }

  async function handleTableCellDragEnd(reservationUrl: string) {
    if (startRAreaPosition === undefined || endRAreaPosition === undefined) {
      return;
    }

    const duration =
      (endRAreaPosition.rowNum - startRAreaPosition.rowNum + 1) *
      minimumReservationDuration;
    await clickBookingFormButton(reservationUrl, duration);
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
