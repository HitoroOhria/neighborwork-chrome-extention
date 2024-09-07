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
              borderRight: latticeBorder,
              borderBottom: latticeBorder,
              gridRow: rowIdx + 1,
              gridColumn: colIdx + 1,
            }}
          />
        )),
    );
}
