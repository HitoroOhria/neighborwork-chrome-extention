import { zIndex } from "../../feature/zIndex";
import { boxStyle } from "../../feature/boxStyle";

export type GridPosition = {
  rowNum: number;
  colNum: number;
};

type ReservationGridReservationAreaProps = {
  startGridPosition: GridPosition | undefined;
  endGridPosition: GridPosition | undefined;
};

export default function ReservationGridReservationArea({
  startGridPosition,
  endGridPosition,
}: ReservationGridReservationAreaProps) {
  if (startGridPosition === undefined) {
    return null;
  }

  const endGridRow =
    endGridPosition === undefined ? "span 1" : endGridPosition.rowNum + 1;
  const endGridCol =
    endGridPosition === undefined ? "span 1" : endGridPosition.colNum + 1;

  return (
    <div
      style={{
        backgroundColor: "#BA9C7F",
        ...boxStyle,
        zIndex: zIndex.reservationGridReservationWindow,
        gridRow: `${startGridPosition.rowNum} / ${endGridRow}`,
        gridColumn: `${startGridPosition.colNum} / ${endGridCol}`,
      }}
    />
  );
}
