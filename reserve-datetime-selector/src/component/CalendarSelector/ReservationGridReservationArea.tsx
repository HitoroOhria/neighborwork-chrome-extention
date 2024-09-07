import { zIndex } from "../../feature/zIndex";
import { boxStyle } from "../../feature/boxStyle";
import { CSSProperties, ReactNode } from "react";

export type GridPosition = {
  rowNum: number;
  colNum: number;
};

export type ReservationGridReservationAreaProps = {
  variant: "reserved" | "reservation";
  startGridPosition: GridPosition | undefined;
  endGridPosition: GridPosition | undefined;
  rowReverse?: boolean;
  children?: ReactNode;
};

export default function ReservationGridReservationArea({
  variant,
  startGridPosition,
  endGridPosition,
  rowReverse,
  children,
}: ReservationGridReservationAreaProps) {
  if (startGridPosition === undefined) {
    return null;
  }

  const startGridRow = rowReverse
    ? startGridPosition.rowNum + 1
    : startGridPosition.rowNum;

  const endGridRow = (function (): string | number {
    if (endGridPosition === undefined) {
      return "span 1";
    }
    return endGridPosition.rowNum + (rowReverse ? 0 : 1);
  })();

  const endGridCol = (function (): string | number {
    if (endGridPosition === undefined) {
      return "span 1";
    }
    return endGridPosition.colNum + 1;
  })();

  return (
    <div
      style={{
        ...variantStyle[variant],
        zIndex: zIndex.reservationGridReservationWindow,
        gridRow: `${startGridRow} / ${endGridRow}`,
        gridColumn: `${startGridPosition.colNum} / ${endGridCol}`,
      }}
    >
      {children}
    </div>
  );
}

const variantStyle: Record<
  ReservationGridReservationAreaProps["variant"],
  CSSProperties
> = {
  reserved: {
    margin: "3px 4px",
    border: "2px solid #F0E68C",
    borderRadius: boxStyle.borderRadius,
    background:
      "repeating-linear-gradient(-45deg, #F0E68C, #F0E68C 1.5px, #fff 0, #fff 20px)",
  },
  reservation: {
    backgroundColor: "#B2FFFF",
    opacity: 0.8,
    ...boxStyle,
  },
};
