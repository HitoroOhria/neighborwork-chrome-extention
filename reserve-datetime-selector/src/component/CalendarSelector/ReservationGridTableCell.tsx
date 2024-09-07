import { DragEvent } from "react";
import { boothCellValues } from "../../model/BoothCellValues";
import { booths } from "../../feature/booth";
import { minimumReservationDuration } from "./CalendarSelector";
import { formatToTimeString } from "../../feature/time";

type ReservationGridTableCellProps = {
  rowNum: number;
  colNum: number;
  onDragStart: (rowNum: number, colNum: number) => void;
  onDragOver: (rowNum: number, colNum: number) => void;
  onDragEnd: () => void;
};

export default function ReservationGridTableCell({
  rowNum,
  colNum,
  onDragStart,
  onDragOver,
  onDragEnd,
}: ReservationGridTableCellProps) {
  function handleDragStart(e: DragEvent<HTMLDivElement>) {
    const img = new Image();
    // ドラッグ中のプレビューを非表示
    img.src = "";
    e.dataTransfer.setDragImage(img, 0, 0);

    onDragStart(rowNum, colNum);
  }

  function handleDragEnter() {
    onDragOver(rowNum, colNum);
  }

  function handleDragEnd() {
    onDragEnd();
  }

  function handleClick() {
    const boothId = booths[colNum - 1].id;
    const timeNum = (rowNum - 1) * minimumReservationDuration;
    const time = formatToTimeString(timeNum);

    const cellValue = boothCellValues.findCellValue({ boothId, time });
    if (cellValue?.reservationUrl === undefined) {
      return;
    }

    window.location.assign(cellValue.reservationUrl);
  }

  return (
    <div
      style={{ gridRow: rowNum, gridColumn: colNum }}
      draggable
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    />
  );
}
