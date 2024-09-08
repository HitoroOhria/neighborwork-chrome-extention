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

  const startGridRow: CSSProperties["gridRow"] = rowReverse
    ? startCellNumber.row + 1
    : startCellNumber.row;

  const endGridRow = (function (): CSSProperties["gridRow"] {
    if (endCellNumber === undefined) {
      return "span 1";
    }
    return endCellNumber.row + (rowReverse ? 0 : 1);
  })();

  const endGridCol = (function (): CSSProperties["gridRow"] {
    if (endCellNumber === undefined) {
      return "span 1";
    }
    return endCellNumber.col + 1;
  })();

  return (
    <div
      style={{
        ...variantStyle(startCellNumber, endCellNumber)[variant],
        zIndex: zIndex.reservationGridReservationArea,
        gridRow: `${startGridRow} / ${endGridRow}`,
        gridColumn: `${startCellNumber.col} / ${endGridCol}`,
      }}
    >
      {children}
    </div>
  );
}

function variantStyle(
  startCellNumber: CellNumber,
  endCellNumber: CellNumber | undefined,
): Record<ReservationGridReservationAreaProps["variant"], CSSProperties> {
  const oneCell =
    endCellNumber === undefined || startCellNumber.row === endCellNumber.row;
  const startUpperCell = startCellNumber.row % 2 === 1;

  const reservedMargin = (function (): string {
    // ReservationGridLattice.tsx で右・下にボーダーを表示して敷き詰めているため、右・下のマージンは 1px 多くする
    const baseMargin = { top: "3px", right: "5px", bottom: "4px", left: "4px" };

    // 1セルは小さくなりすぎるので、上下どちらかのマージンを削る
    if (oneCell) {
      if (startUpperCell) {
        baseMargin.bottom = "0px";
      } else {
        baseMargin.top = "0px";
      }
    }

    return `${baseMargin.top} ${baseMargin.right} ${baseMargin.bottom} ${baseMargin.left}`;
  })();

  return {
    reserved: {
      margin: reservedMargin,
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
}
