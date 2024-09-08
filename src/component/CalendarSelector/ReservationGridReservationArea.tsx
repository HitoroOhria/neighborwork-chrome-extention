import { zIndex } from "../../feature/zIndex";
import { boxStyle } from "../../feature/boxStyle";
import { CSSProperties, ReactNode } from "react";
import { CellNumber } from "../../model/CellNumber";

export type ReservationGridReservationAreaProps = {
  variant: "reserved" | "reservation";
  startCellNumber: CellNumber | undefined;
  endCellNumber: CellNumber | undefined;
  rowReverse?: boolean;
  children?: ReactNode;
};

export default function ReservationGridReservationArea({
  variant,
  startCellNumber,
  endCellNumber,
  rowReverse,
  children,
}: ReservationGridReservationAreaProps) {
  if (startCellNumber === undefined) {
    return null;
  }

  const startGridRow = rowReverse
    ? startCellNumber.row + 1
    : startCellNumber.row;

  const endGridRow = (function (): string | number {
    if (endCellNumber === undefined) {
      return "span 1";
    }
    return endCellNumber.row + (rowReverse ? 0 : 1);
  })();

  const endGridCol = (function (): string | number {
    if (endCellNumber === undefined) {
      return "span 1";
    }
    return endCellNumber.col + 1;
  })();

  return (
    <div
      style={{
        ...variantStyle[variant],
        zIndex: zIndex.reservationGridReservationArea,
        gridRow: `${startGridRow} / ${endGridRow}`,
        gridColumn: `${startCellNumber.col} / ${endGridCol}`,
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
