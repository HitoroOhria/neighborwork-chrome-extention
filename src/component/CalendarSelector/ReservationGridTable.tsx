import ReservationGridTableCell from "./ReservationGridTableCell";

type ReservationGridTableProps = {
  row: number;
  col: number;
  onDragStart: (rowNum: number, colNum: number) => void;
  onDragOver: (rowNum: number, colNum: number) => void;
  onDragEnd: () => void;
  onClick: (rowNum: number, colNum: number) => void;
};

export default function ReservationGridTable({
  row,
  col,
  onDragStart,
  onDragOver,
  onDragEnd,
  onClick,
}: ReservationGridTableProps) {
  // 行 x 列 でセルを作成する
  return Array(row)
    .fill(null)
    .map((_, rowIdx) =>
      Array(col)
        .fill(null)
        .map((_, colIdx) => (
          <ReservationGridTableCell
            key={`${rowIdx}-${colIdx}`}
            row={rowIdx + 1}
            col={colIdx + 1}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            onClick={onClick}
          />
        )),
    );
}
