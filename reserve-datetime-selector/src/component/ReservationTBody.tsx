import { Booth } from "../feature/booth";
import TimeSelect from "./TimeSelect";

type ReservationTBodyProps = {
  booths: Booth[];
};

export default function ReservationTBody({ booths }: ReservationTBodyProps) {
  return (
    <tbody>
      <tr>
        {booths.map((booth) => (
          <th
            className="article-name" // WordPress 側で用意されているクラス
            colSpan={0}
          >
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
