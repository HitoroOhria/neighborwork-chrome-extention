import {CSSProperties, DragEvent, useEffect, useState} from "react";
import { useBoothCellValues } from "../../model/BoothCellValues";
import { useBooth } from "../../feature/booth";
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
  const [cursor, setCursor] = useState<CSSProperties["cursor"]>("pointer");

  const { booths } = useBooth();
  const { boothCellValues } = useBoothCellValues();

  const cellValue = boothCellValues.findCellValueByCellNum({ rowNum, colNum });

  useEffect(() => {
    if (cellValue?.reserved()) {
      setCursor("default");
    }
  }, [cellValue]);

  function disableDragPreview(e: DragEvent<HTMLDivElement>) {
    const img = new Image();
    img.src = "";
    e.dataTransfer.setDragImage(img, 0, 0);
  }

  function handleDragStart(e: DragEvent<HTMLDivElement>) {
    disableDragPreview(e);
    setCursor("grab");
    onDragStart(rowNum, colNum);
  }

  function handleDragEnter() {
    setCursor("grab");
    onDragOver(rowNum, colNum);
  }

  function handleDragEnd() {
    setCursor("pointer");
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
      style={{ cursor, gridRow: rowNum, gridColumn: colNum }}
      draggable
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    />
  );
}
