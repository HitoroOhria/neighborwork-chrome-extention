import {
  allBoothIds,
  boothAId,
  boothPId,
  boothRId,
  boothSunId,
  boothTId,
  boothYId,
} from "../model/Booth";
import { BoothCell } from "../model/BoothCell";
import { BoothCellsData } from "../model/BoothCells";
import { NWDate } from "../model/NWDate";

type CellIndex = { time: number; reservableFlag: number };
type CellIndexPerBooth = Record<string, CellIndex>;

// ブースごとのセルのインデックス
const cellIndexPerBooth: CellIndexPerBooth = {
  [boothPId]: { time: 0, reservableFlag: 1 },
  [boothAId]: { time: 2, reservableFlag: 3 },
  [boothRId]: { time: 4, reservableFlag: 5 },
  [boothTId]: { time: 6, reservableFlag: 7 },
  [boothYId]: { time: 8, reservableFlag: 9 },
  [boothSunId]: { time: 10, reservableFlag: 11 },
};

export function parseTableToBoothCellData(
  table: HTMLTableElement,
  tableCaption: HTMLTableCaptionElement,
): BoothCellsData {
  const res: BoothCellsData = {};
  allBoothIds.forEach((boothId) => {
    res[boothId] = getBoothCells(table, tableCaption, boothId);
  });
  return res;
}

function getBoothCells(
  table: HTMLTableElement,
  tableCaption: HTMLTableCaptionElement,
  boothId: string,
): BoothCell[] {
  const cells: BoothCell[] = [];
  for (let i = 0; i < table.rows.length; i++) {
    // ヘッダ行をスキップ
    if (i === 0) {
      continue;
    }

    const row = table.rows[i];
    const cell = getBoothCell(row, tableCaption, boothId);

    cells.push(cell);
  }
  return cells;
}

function getBoothCell(
  row: HTMLTableRowElement,
  tableCaption: HTMLTableCaptionElement,
  boothId: string,
): BoothCell {
  const cellIndex = cellIndexPerBooth[boothId];

  const time = row.cells[cellIndex.time].textContent!;
  const reservableFlag = row.cells[cellIndex.reservableFlag].textContent!;
  const anchorElement = row.cells[cellIndex.reservableFlag].childNodes[0]
    ?.childNodes[0] as HTMLAnchorElement | undefined;
  const reservationUrl = anchorElement?.href;

  const nwDate = parseAsNWDate(tableCaption, time);

  return new BoothCell({ boothId, nwDate, reservableFlag });
}

function parseAsNWDate(
  tableCaption: HTMLTableCaptionElement,
  time: string,
): NWDate {
  if (tableCaption.textContent === null) {
    throw new Error("table caption text content is null.");
  }

  const pattern = /(\d{4})年(\d{1,2})月(\d{1,2})日/;
  const match = tableCaption.textContent.match(pattern);
  if (match === null) {
    throw new Error(`matched date is null. ${tableCaption.textContent}`);
  }

  const year = match[1].padStart(4, "0");
  const month = match[2].padStart(2, "0");
  const day = match[3].padStart(2, "0");

  // JST として表示されているが、値は UTC なのでそのように扱う
  const date = new Date(`${year}-${month}-${day}T${time}:00Z`);
  return new NWDate(date);
}
