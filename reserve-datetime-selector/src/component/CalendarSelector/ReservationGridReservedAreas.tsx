import ReservationGridReservationArea, {
  ReservationGridReservationAreaProps,
} from "./ReservationGridReservationArea";
import { BoothCellValues, boothCellValues } from "../../model/BoothCellValues";
import { allBoothIds, Booth, booths } from "../../feature/booth";
import { getTimeAsMinutes } from "../../feature/time";
import { minimumReservationDuration } from "./CalendarSelector";
import { useMemo } from "react";

type ReservationGridReservedAreasProps = {};

export default function ReservationGridReservedAreas({}: ReservationGridReservedAreasProps) {
  const reservedAreasProps = useMemo(
    () => getReservedAreasProps(allBoothIds, booths, boothCellValues),
    [allBoothIds, booths, boothCellValues],
  );
  console.log("reservedAreasProps", reservedAreasProps);

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

function getReservedAreasProps(
  allBoothIds: string[],
  booths: Booth[],
  boothCellValues: BoothCellValues,
): ReservedAreasProps[] {
  const reservedBoothCellValues = boothCellValues.getReservedBoothCellValues();
  console.log("reservedBoothCellValues", reservedBoothCellValues);

  return allBoothIds.flatMap<ReservedAreasProps>((boothId) => {
    const cellValues = reservedBoothCellValues[boothId];
    const colNum = booths.findIndex((booth) => booth.id === boothId) + 1;

    return cellValues.map<ReservedAreasProps>((cellValue) => {
      const timeNum = getTimeAsMinutes(cellValue.time);
      const startRowNum = timeNum / minimumReservationDuration + 1;
      // const endRowNum = startRowNum + 1;

      return {
        startGridPosition: { rowNum: startRowNum, colNum },
        endGridPosition: undefined, // { rowNum: endRowNum, colNum },
      };
    });
  });
}
