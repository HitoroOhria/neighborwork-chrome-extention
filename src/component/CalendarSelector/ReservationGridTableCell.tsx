import { CSSProperties, DragEvent, useEffect, useState } from "react";
import { useBoothCells } from "../../model/BoothCells";

type ReservationGridTableCellProps = {
  row: number;
  col: number;
  onDragStart: (rowNum: number, colNum: number) => void;
  onDragOver: (rowNum: number, colNum: number) => void;
  onDragEnd: () => void;
  onClick: (rowNum: number, colNum: number) => void;
};

export default function ReservationGridTableCell({
  row,
  col,
  onDragStart,
  onDragOver,
  onDragEnd,
  onClick,
}: ReservationGridTableCellProps) {
  const [cursor, setCursor] = useState<CSSProperties["cursor"]>("pointer");

  const { boothCells } = useBoothCells();

  const cell = boothCells.findBoothCellByCellNumber({
    row,
    col,
  });

  useEffect(() => {
    if (cell?.reserved()) {
      setCursor("default");
    }
  }, [cell]);

  function handleDragStart(e: DragEvent<HTMLDivElement>) {
    disableDragPreview(e);
    setCursor("grab");
    onDragStart(row, col);
  }

  function handleDragEnter() {
    setCursor("grab");
    onDragOver(row, col);
  }

  function handleDragEnd() {
    setCursor("pointer");

    onDragEnd();
  }

  function handleClick() {
    onClick(row, col);
  }

  return (
    <div
      style={{ cursor, gridRow: row, gridColumn: col }}
      draggable
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    />
  );
}

// ドラッグ中のプレビュー表示をなくす
function disableDragPreview(e: DragEvent<HTMLDivElement>) {
  const img = new Image();
  img.src = "";
  e.dataTransfer.setDragImage(img, 0, 0);
}
