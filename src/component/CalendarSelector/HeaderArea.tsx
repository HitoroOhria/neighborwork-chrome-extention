import { areaName } from "./CalendarSelector";
import { headerBorder, headerColStyle } from "../../feature/headerColStyle";
import { Booth } from "../../feature/booth";

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
            style={{
              ...headerColStyle,
              border: undefined,
              borderTop: headerBorder,
              borderRight: headerBorder,
              borderBottom: headerBorder,
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
