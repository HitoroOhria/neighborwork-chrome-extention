import { useState } from "react";
import { useBoothCells } from "../model/BoothCells";
import { submitBookingForm } from "./bookingFrom";
import { CellNumber } from "../model/CellNumber";
import { maxReserveDuration, minReservationDuration } from "./neighborWork";

// 最大で選択可能なセルの数 (4個)
// before initialization エラーが発生するので関数で呼ぶ
function maxReserveCellCount(): number {
  return maxReserveDuration / minReservationDuration;
}

export function useReservationArea() {
  const [reverse, setReverse] = useState(false);

  // ドラッグして表示する予約エリアのセルを管理
  const [startRAreaCellNumber, setStartRAreaCellNumber] = useState<
    CellNumber | undefined
  >(undefined);
  const [endRAreaCellNumber, setEndRAreaCellNumber] = useState<
    CellNumber | undefined
  >(undefined);

  const { boothCells } = useBoothCells();

  // セルをドラッグしたら、開始セルをセットする
  function handleTableCellDragging(row: number, col: number) {
    // 最初のドラッグ要素であれば、そのまま値をセットする
    if (startRAreaCellNumber === undefined) {
      setStartRAreaCellNumber({ row, col });
      return;
    }

    const reverse = startRAreaCellNumber.row > row;
    setReverse(reverse);

    // 既にドラッグ済みの要素と異なる列にはウィンドウを広げない
    if (startRAreaCellNumber.col !== col) {
      return;
    }
    // 最大予約可能数を選択済みであれば、それ以上はウィンドウを広げない
    const cellCount = Math.abs(startRAreaCellNumber.row - row) + 1;
    if (cellCount > maxReserveCellCount()) {
      return;
    }

    setEndRAreaCellNumber({ row, col });
  }

  // セルのドラッグが終了したら、予約フォームをサブミットする
  async function handleTableCellDragEnd() {
    if (
      startRAreaCellNumber === undefined ||
      endRAreaCellNumber === undefined
    ) {
      return;
    }

    const cellNumber = reverse ? endRAreaCellNumber : startRAreaCellNumber;
    const cell = boothCells.findBoothCellByCellNumber(cellNumber);
    if (cell?.reservationUrl === undefined) {
      return;
    }

    const rowDiff = Math.abs(startRAreaCellNumber.row - endRAreaCellNumber.row);
    const cellCount = rowDiff + 1;
    const duration = cellCount * minReservationDuration;

    await submitBookingForm(cell.reservationUrl, duration);
  }

  // セルをドラッグではなくクリックしたら、予約フォームをサブミットする
  async function handleTableCellClick(row: number, col: number) {
    const cell = boothCells.findBoothCellByCellNumber({
      row,
      col,
    });
    if (cell?.reservationUrl === undefined) {
      return;
    }

    await submitBookingForm(cell.reservationUrl, minReservationDuration);
  }

  return {
    reverse,
    startRAreaCellNumber,
    endRAreaCellNumber,
    handleTableCellDragging,
    handleTableCellDragEnd,
    handleTableCellClick,
  };
}
