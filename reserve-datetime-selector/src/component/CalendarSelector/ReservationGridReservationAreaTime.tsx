import { useBoothCellValues } from "../../model/BoothCellValues";
import { GridPosition } from "./ReservationGridReservationArea";
import { formatToTimeString, getTimeAsMinutes } from "../../feature/time";
import { minReservationDuration } from "./CalendarSelector";
import { useEffect, useState } from "react";

type ReservationGridReservationAreaTimeProps = {
  startGridPosition: GridPosition | undefined;
  endGridPosition: GridPosition | undefined;
  rowReverse?: boolean;
};

export default function ReservationGridReservationAreaTime({
  startGridPosition,
  endGridPosition,
  rowReverse,
}: ReservationGridReservationAreaTimeProps) {
  const [startTime, setStartTime] = useState<string | undefined>(undefined);
  const [endTime, setEndTime] = useState<string | undefined>(undefined);

  const { boothCellValues } = useBoothCellValues();

  useEffect(() => {
    if (startGridPosition === undefined) {
      return;
    }

    const startCellValue =
      boothCellValues.findCellValueByGridPosition(startGridPosition);
    setStartTime(startCellValue?.time);
  }, [startGridPosition]);

  useEffect(() => {
    if (endGridPosition === undefined) {
      if (startTime === undefined) {
        return;
      }

      const endTime = getNextTime(startTime);
      setEndTime(endTime);
      return;
    }

    const endCellValue =
      boothCellValues.findCellValueByGridPosition(endGridPosition);
    if (endCellValue === undefined) {
      return;
    }

    const endTime = getNextTime(endCellValue.time);
    setEndTime(endTime);
  }, [startTime, endGridPosition]);

  const dispStartTime = rowReverse ? endTime : startTime;
  const dispEndTime = rowReverse ? startTime : endTime;

  if (dispStartTime === undefined || dispEndTime === undefined) {
    return null;
  }

  return (
    <div style={{ paddingTop: "3px", paddingLeft: "8px" }}>
      {dispStartTime} ~ {dispEndTime}
    </div>
  );
}

function getNextTime(time: string): string {
  const timeNum = getTimeAsMinutes(time);
  const nextTimeNum = timeNum + minReservationDuration;
  return formatToTimeString(nextTimeNum);
}
