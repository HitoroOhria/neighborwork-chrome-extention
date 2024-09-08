import { zIndex } from "../../feature/zIndex";

export const latticeBorder = "1px solid #DADCE0";

type ReservationGridLatticeProps = {
  row: number;
  col: number;
};

export default function ReservationGridLattice({
  row,
  col,
}: ReservationGridLatticeProps) {
  return Array(row)
    .fill(null)
    .flatMap((_, rowIdx) =>
      Array(col)
        .fill(null)
        .map((_, colIdx) => (
          <div
            style={{
              // 右・下のボーダーを表示し、並べていく
              borderRight: latticeBorder,
              borderBottom: rowIdx % 2 === 0 ? undefined : latticeBorder,
              zIndex: zIndex.reservationGridLattice,
              gridRow: rowIdx + 1,
              gridColumn: colIdx + 1,
            }}
          />
        )),
    );
}
