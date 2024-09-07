import { areaName, minReservationDuration } from "./CalendarSelector";
import ReservationGridLattice from "./ReservationGridLattice";
import ReservationGridTable from "./ReservationGridTable";
import ReservationGridReservationArea, {
  GridPosition,
} from "./ReservationGridReservationArea";
import { useState } from "react";
import ReservationGridReservedAreas from "./ReservationGridReservedAreas";
import { submitBookingForm } from "../../feature/bookingFrom";
import { useBoothCellValues } from "../../model/BoothCellValues";
import ReservationGridReservationAreaTime from "./ReservationGridReservationAreaTime";

export const reservationCellHeight = "22px";

const maxReserveDuration = 120;

// Before initialize が発生するので関数で呼ぶ
function maxReserveCellCount(): number {
  return maxReserveDuration / minReservationDuration;
}

type ReservationProps = {
  row: number;
  col: number;
};

export default function ReservationArea({ row, col }: ReservationProps) {
  const [reverse, setReverse] = useState(false);

  const [startRAreaPosition, setStartRAreaPosition] = useState<
    GridPosition | undefined
  >(undefined);
  const [endRAreaPosition, setEndRAreaPosition] = useState<
    GridPosition | undefined
  >(undefined);

  const { boothCellValues } = useBoothCellValues();

  function handleTableCellDragging(rowNum: number, colNum: number) {
    // 最初のドラッグ要素であれば、そのまま値をセットする
    if (startRAreaPosition === undefined) {
      setStartRAreaPosition({ rowNum, colNum });
      return;
    }

    const reverse = startRAreaPosition.rowNum > rowNum;
    setReverse(reverse);

    // 既にドラッグ済みの要素と異なる列にはウィンドウを広げない
    if (startRAreaPosition.colNum !== colNum) {
      return;
    }
    // 最大予約可能数を選択済みであれば、それ以上はウィンドウを広げない
    const cellCount = Math.abs(startRAreaPosition.rowNum - rowNum) + 1;
    const maxCellCount = reverse
      ? maxReserveCellCount() + 1
      : maxReserveCellCount();
    if (cellCount > maxCellCount) {
      return;
    }

    setEndRAreaPosition({ rowNum, colNum });
  }

  async function handleTableCellDragEnd() {
    if (startRAreaPosition === undefined || endRAreaPosition === undefined) {
      return;
    }

    const position = reverse ? endRAreaPosition : startRAreaPosition;
    const cellValue = boothCellValues.findCellValueByGridPosition(position);
    if (cellValue?.reservationUrl === undefined) {
      return;
    }

    const rowDiff = Math.abs(
      startRAreaPosition.rowNum - endRAreaPosition.rowNum,
    );
    const cellCount = reverse ? rowDiff - 1 : rowDiff + 1;
    const duration = cellCount * minReservationDuration;
    await submitBookingForm(cellValue.reservationUrl, duration);
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
