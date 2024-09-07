import { useState } from "react";
import { GridPosition } from "../component/CalendarSelector/ReservationGridReservationArea";
import { useBoothCellValues } from "../model/BoothCellValues";
import { minReservationDuration } from "../component/CalendarSelector/CalendarSelector";
import { submitBookingForm } from "./bookingFrom";

const maxReserveDuration = 120;

// before initialization エラーが発生するので関数で呼ぶ
function maxReserveCellCount(): number {
  return maxReserveDuration / minReservationDuration;
}

export function useReservationArea() {
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
    if (cellCount > maxReserveCellCount()) {
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
    const cellCount = rowDiff + 1;
    const duration = cellCount * minReservationDuration;

    await submitBookingForm(cellValue.reservationUrl, duration);
  }

  async function handleTableCellClick(rowNum: number, colNum: number) {
    const cellValue = boothCellValues.findCellValueByGridPosition({
      rowNum,
      colNum,
    });
    if (cellValue?.reservationUrl === undefined) {
      return;
    }

    await submitBookingForm(cellValue.reservationUrl, minReservationDuration);
  }

  return {
    reverse,
    startRAreaPosition,
    endRAreaPosition,
    handleTableCellDragging,
    handleTableCellDragEnd,
    handleTableCellClick,
  };
}
