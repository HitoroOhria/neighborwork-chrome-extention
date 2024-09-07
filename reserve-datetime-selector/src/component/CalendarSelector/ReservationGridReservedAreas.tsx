import ReservationGridReservationArea, {
  ReservationGridReservationAreaProps,
} from "./ReservationGridReservationArea";
import { BoothCellValues, boothCellValues } from "../../model/BoothCellValues";
import { allBoothIds, Booth, booths } from "../../feature/booth";
import { useMemo } from "react";

type ReservationGridReservedAreasProps = {};

export default function ReservationGridReservedAreas({}: ReservationGridReservedAreasProps) {
  const reservedAreasProps = useMemo(
    () => getReservedAreasProps(allBoothIds, booths, boothCellValues),
    [allBoothIds, booths, boothCellValues],
  );

  return (
    <>
      {reservedAreasProps.map((props, idx) => (
        <ReservationGridReservationArea
          key={`${JSON.stringify(props)}-${idx}`}
          variant="reserved"
          startGridPosition={props.startGridPosition}
          endGridPosition={props.endGridPosition}
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
  booths: Booth[],
  boothCellValues: BoothCellValues,
): ReservedAreasProps[] {
  return allBoothIds.flatMap<ReservedAreasProps>((boothId) => {
    const cellValues = boothCellValues.getCellValues(boothId);
    const colNum = booths.findIndex((booth) => booth.id === boothId) + 1;

    const rowNums: RowNum[] = [];
    for (let i = 0; i < cellValues.length; i++) {
      const value = cellValues[i];
      // セルが予約済みであれば、startRowNum を埋める
      if (value.reserved()) {
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

    return rowNums.map((rowNum) => ({
      startGridPosition: { rowNum: rowNum.start!, colNum },
      endGridPosition: { rowNum: rowNum.end!, colNum },
    }));
  });
}
