import { areaName } from "./CalendarSelector";
import ReservationGridLattice from "./ReservationGridLattice";
import ReservationGridTable from "./ReservationGridTable";
import ReservationGridReservationArea, {
  GridPosition,
} from "./ReservationGridReservationArea";
import { useState } from "react";

export const reservationCellHeight = "22px";

type ReservationProps = {
  row: number;
  col: number;
};

export default function ReservationArea({ row, col }: ReservationProps) {
  const [startReservationAreaPosition, setStartReservationAreaPosition] =
    useState<GridPosition | undefined>(undefined);
  const [endReservationAreaPosition, setEndReservationAreaPosition] = useState<
    GridPosition | undefined
  >(undefined);

  function handleTableCellDragging(rowNum: number, colNum: number) {
    // 最初のドラッグ要素であれば、そのまま値をセットする
    if (startReservationAreaPosition === undefined) {
      setStartReservationAreaPosition({ rowNum, colNum });
      return;
    }

    // 既にドラッグ済みの要素と異なる列にはウィンドウを広げない
    if (startReservationAreaPosition.colNum !== colNum) {
      return;
    }

    setEndReservationAreaPosition({ rowNum, colNum });
  }

  function handleTableCellDragEnd() {}

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
        <ReservationGridReservationArea
          startGridPosition={startReservationAreaPosition}
          endGridPosition={endReservationAreaPosition}
        />
      </div>
    </div>
  );
}
