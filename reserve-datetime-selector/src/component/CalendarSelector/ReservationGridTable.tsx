import ReservationGridTableCell from "./ReservationGridTableCell";

type ReservationGridTableProps = {
  row: number;
  col: number;
  onDragStart: (rowNum: number, colNum: number) => void;
  onDragOver: (rowNum: number, colNum: number) => void;
  onDragEnd: () => void;
};

export default function ReservationGridTable({
  row,
  col,
  onDragStart,
  onDragOver,
  onDragEnd,
}: ReservationGridTableProps) {
  return Array(row)
    .fill(null)
    .map((_, rowIdx) =>
      Array(col)
        .fill(null)
        .map((_, colIdx) => (
          <ReservationGridTableCell
            rowNum={rowIdx + 1}
            colNum={colIdx + 1}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
          />
        )),
    );
}
