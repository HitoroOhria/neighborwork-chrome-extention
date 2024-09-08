import { useBoothCells } from "../../model/BoothCells";
import { ChangeEvent, useMemo, useState } from "react";

type TimeSelectProps = {
  boothId: string;
};

export default function TimeSelect({ boothId }: TimeSelectProps) {
  const { boothCells } = useBoothCells();
  const [reservationUrl, setReservationUrl] = useState<string | undefined>(
    boothCells.getMinimumTimeReservationUrl(boothId),
  );

  const boothTimes = useMemo(() => {
    return boothCells.getBoothReservableTimes(boothId);
  }, [boothId]);

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    const time = e.target.value;
    const cell = boothCells.findBoothCell({ boothId, time });

    setReservationUrl(cell?.reservationUrl);
  }

  return (
    <div>
      <div className="vertical-container">
        <select className="minimal" onChange={handleSelectChange}>
          {boothTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        <a href={reservationUrl}>
          <button className="reservation-button">予約</button>
        </a>
      </div>
    </div>
  );
}
