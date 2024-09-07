import { boothCellValues } from "../../model/BoothCellValues";
import { ChangeEvent, useMemo, useState } from "react";

type TimeSelectProps = {
  boothId: string;
};

export default function TimeSelect({ boothId }: TimeSelectProps) {
  const [reservationUrl, setReservationUrl] = useState<string | undefined>(
    boothCellValues.getMinimumTimeReservationUrl(boothId),
  );

  const boothTimes = useMemo(() => {
    return boothCellValues.getBoothReservableTimes(boothId);
  }, [boothId]);

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    const time = e.target.value;
    const cellValue = boothCellValues.findCellValue({ boothId, time });

    setReservationUrl(cellValue?.reservationUrl);
  }

  return (
    <div>
      <div className="vertical-container">
        <select className="minimal" onChange={handleSelectChange}>
          {boothTimes.map((time) => (
            <option value={time}>{time}</option>
          ))}
        </select>
        <a href={reservationUrl}>
          <button className="reservation-button">予約</button>
        </a>
      </div>
    </div>
  );
}
