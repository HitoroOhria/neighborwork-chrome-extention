import { areaName } from "./CalendarSelector";
import { headerBorder, headerColStyle } from "../../feature/headerColStyle";
import { Booth } from "../../model/Booth";

type HeaderAreaProps = {
  booths: Booth[];
};

export default function HeaderArea({ booths }: HeaderAreaProps) {
  return (
    <div style={{ gridArea: areaName.header }}>
      <div
        style={{
          display: "grid",
          gridTemplateRows: headerColStyle.height,
          gridTemplateColumns: `repeat(${booths.length}, 1fr)`,
        }}
      >
        {booths.map((booth, idx) => (
          <div
            key={booth.name}
            style={{
              ...headerColStyle,
              border: undefined,
              // コ の字でボーダーをセットして並べていく
              borderTop: headerBorder,
              borderRight: headerBorder,
              borderBottom: headerBorder,
              // 1番目の要素のみ左のボーダーも表示する
              ...(idx === 0 ? { borderLeft: headerBorder } : {}),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gridRow: 1,
              gridColumn: idx + 1,
            }}
          >
            {booth.name}
          </div>
        ))}
      </div>
    </div>
  );
}
