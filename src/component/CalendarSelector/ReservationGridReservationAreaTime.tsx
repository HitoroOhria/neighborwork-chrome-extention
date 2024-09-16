import { useBoothCells } from "../../model/BoothCells";
import { getNextTime } from "../../feature/time";
import { useEffect, useState } from "react";
import { CellNumber } from "../../model/CellNumber";

type ReservationGridReservationAreaTimeProps = {
  startCellNumber: CellNumber | undefined;
  endCellNumber: CellNumber | undefined;
  rowReverse?: boolean;
};

export default function ReservationGridReservationAreaTime({
  startCellNumber,
  endCellNumber,
  rowReverse,
}: ReservationGridReservationAreaTimeProps) {
  const [startTime, setStartTime] = useState<string | undefined>(undefined);
  const [endTime, setEndTime] = useState<string | undefined>(undefined);

  const { boothCells } = useBoothCells();

  // 開始時刻をセットする
  useEffect(() => {
    if (startCellNumber === undefined) {
      return;
    }

    const startCell = boothCells.findBoothCellByCellNumber(startCellNumber);
    if (startCell === undefined) {
      return;
    }
    if (rowReverse) {
      const startTime = getNextTime(startCell.timeText);
      setStartTime(startTime);
      return;
    }

    setStartTime(startCell.timeText);
  }, [rowReverse, startCellNumber]);

  // 終了時刻をセットする
  useEffect(() => {
    if (endCellNumber === undefined) {
      if (startTime === undefined) {
        return;
      }

      const endTime = getNextTime(startTime);
      setEndTime(endTime);
      return;
    }

    const endCell = boothCells.findBoothCellByCellNumber(endCellNumber);
    if (endCell === undefined) {
      return;
    }

    const endTime = rowReverse
      ? endCell.timeText
      : getNextTime(endCell.timeText);
    setEndTime(endTime);
  }, [rowReverse, startTime, endCellNumber]);

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
