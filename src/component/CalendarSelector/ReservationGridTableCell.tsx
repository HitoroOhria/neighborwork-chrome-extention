import { CSSProperties, DragEvent, useEffect, useState } from "react";
import { useBoothCellValues } from "../../model/BoothCellValues";

type ReservationGridTableCellProps = {
  rowNum: number;
  colNum: number;
  onDragStart: (rowNum: number, colNum: number) => void;
  onDragOver: (rowNum: number, colNum: number) => void;
  onDragEnd: () => void;
  onClick: (rowNum: number, colNum: number) => void;
};

export default function ReservationGridTableCell({
  rowNum,
  colNum,
  onDragStart,
  onDragOver,
  onDragEnd,
  onClick,
}: ReservationGridTableCellProps) {
  const [cursor, setCursor] = useState<CSSProperties["cursor"]>("pointer");

  const { boothCellValues } = useBoothCellValues();

  const cellValue = boothCellValues.findCellValueByGridPosition({
    rowNum,
    colNum,
  });

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
    onClick(rowNum, colNum);
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
