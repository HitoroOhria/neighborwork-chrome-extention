import { areaName } from "./CalendarSelector";
import { useTableCaption } from "../../model/OrigTable";

export default function DateArea() {
  const tableCaption = useTableCaption();

  return (
    <div
      style={{
        fontWeight: "bold",
        textAlign: "center",
        gridArea: areaName.date,
      }}
    >
      {tableCaption.textContent}
    </div>
  );
}
