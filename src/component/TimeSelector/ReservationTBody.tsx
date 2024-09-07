import { Booth } from "../../feature/booth";
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
          <th style={headerColStyle} colSpan={0}>
            {booth.name}
          </th>
        ))}
      </tr>
      <tr>
        {booths.map((booth) => (
          <td>
            <TimeSelect boothId={booth.id} />
          </td>
        ))}
      </tr>
    </tbody>
  );
}
