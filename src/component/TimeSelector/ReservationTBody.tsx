import { Booth } from "../../model/Booth";
import TimeSelect from "./TimeSelect";
import { headerColStyle } from "../../feature/headerColStyle";

type ReservationTBodyProps = {
  booths: Booth[];
};

export default function ReservationTBody({ booths }: ReservationTBodyProps) {
  return (
    <tbody>
      <tr>
        {booths.map((booth) => (
          <th key={booth.id} style={headerColStyle} colSpan={0}>
            {booth.name}
          </th>
        ))}
      </tr>
      <tr>
        {booths.map((booth) => (
          <td>
            <TimeSelect key={booth.id} boothId={booth.id} />
          </td>
        ))}
      </tr>
    </tbody>
  );
}
