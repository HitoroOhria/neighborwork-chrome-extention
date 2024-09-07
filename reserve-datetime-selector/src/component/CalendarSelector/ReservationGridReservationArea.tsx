import { zIndex } from "../../feature/zIndex";
import { boxStyle } from "../../feature/boxStyle";

export type GridPosition = {
  rowNum: number;
  colNum: number;
};

export type ReservationGridReservationAreaProps = {
  variant: "reserved" | "reservation";
  startGridPosition: GridPosition | undefined;
  endGridPosition: GridPosition | undefined;
};

export default function ReservationGridReservationArea({
  variant,
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
        background:
          variant === "reserved"
            ? "repeating-linear-gradient( -45deg, #F0E68C, #F0E68C 3px, #fff 0, #fff 19px)"
            : undefined,
        backgroundColor: variant === "reserved" ? undefined : "#BA9C7F",
        ...(variant === "reserved" ? {} : boxStyle),
        zIndex: zIndex.reservationGridReservationWindow,
        gridRow: `${startGridPosition.rowNum} / ${endGridRow}`,
        gridColumn: `${startGridPosition.colNum} / ${endGridCol}`,
      }}
    />
  );
}
