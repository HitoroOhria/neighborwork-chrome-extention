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
    if (startCellValue === undefined) {
      return;
    }
    if (rowReverse) {
      const startTime = getNextTime(startCellValue.time);
      setStartTime(startTime);
      return;
    }

    setStartTime(startCellValue.time);
  }, [rowReverse, startGridPosition]);

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

    const endTime = rowReverse
      ? endCellValue.time
      : getNextTime(endCellValue.time);
    setEndTime(endTime);
  }, [rowReverse, startTime, endGridPosition]);

  if (startTime === undefined || endTime === undefined) {
    return null;
  }

  const dispStartTime = rowReverse ? endTime : startTime;
  const dispEndTime = rowReverse ? startTime : endTime;

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
