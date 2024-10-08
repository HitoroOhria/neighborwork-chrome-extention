import ReservationGridReservationArea, {
  ReservationGridReservationAreaProps,
} from "./ReservationGridReservationArea";
import { BoothCells, useBoothCells } from "../../model/BoothCells";
import { Booth, useBooth } from "../../model/Booth";
import { useMemo } from "react";
import { getColNumberByBoothId } from "../../model/CellNumber";

type ReservationGridReservedAreasProps = {};

export default function ReservationGridReservedAreas({}: ReservationGridReservedAreasProps) {
  const { allBoothIds } = useBooth();
  const { boothCells } = useBoothCells();

  const reservedAreasProps = useMemo(
    () => getReservedAreasProps(allBoothIds, boothCells),
    [allBoothIds, boothCells],
  );

  return (
    <>
      {reservedAreasProps.map((props) => (
        <ReservationGridReservationArea
          key={JSON.stringify(props)}
          variant="reserved"
          startCellNumber={props.startCellNumber}
          endCellNumber={props.endCellNumber}
        />
      ))}
    </>
  );
}

type ReservedAreasProps = Omit<ReservationGridReservationAreaProps, "variant">;

type RowNum = {
  start: number | undefined;
  end: number | undefined;
};

function getReservedAreasProps(
  allBoothIds: string[],
  boothCells: BoothCells,
): ReservedAreasProps[] {
  return allBoothIds.flatMap<ReservedAreasProps>((boothId) => {
    const cells = boothCells.getCells(boothId);
    const colNum = getColNumberByBoothId(boothId);

    // 時間が小さい順にセルを捜査していく
    const rowNums: RowNum[] = [];
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      // セルが予約済みであれば、startRowNum を埋める
      if (cell.reserved()) {
        const rowNum = rowNums.at(-1);
        if (rowNum === undefined) {
          rowNums.push({ start: i + 1, end: undefined });
          continue;
        }
        if (rowNum.end === undefined) {
          continue;
        }

        rowNums.push({ start: i + 1, end: undefined });
        continue;
      }

      // セルが予約可能であれば、endRowNum を埋める
      const rowNum = rowNums.at(-1);
      if (rowNum === undefined) {
        continue;
      }
      if (rowNum.end !== undefined) {
        continue;
      }

      rowNum.end = i;
    }

    // もし、最後のセル (23:30 ~ 24:00) が予約済みの場合、上の操作では end = undefined で終わってしまう
    // その場合はここで end をセットする
    if (cells.at(-1)?.reserved()) {
      const lastRowNum = rowNums.at(-1);
      if (lastRowNum !== undefined) {
        lastRowNum.end = cells.length;
      }
    }

    return rowNums.map((rowNum) => ({
      startCellNumber: { row: rowNum.start!, col: colNum },
      endCellNumber: { row: rowNum.end!, col: colNum },
    }));
  });
}
