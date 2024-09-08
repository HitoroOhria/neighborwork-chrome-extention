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

type CellIndex = { time: number; reservable: number };
type CellIndexPerBooth = Record<string, CellIndex>;

// ブースごとのセルのインデックス
const cellIndexPerBooth: CellIndexPerBooth = {
  [boothPId]: { time: 0, reservable: 1 },
  [boothAId]: { time: 2, reservable: 3 },
  [boothRId]: { time: 4, reservable: 5 },
  [boothTId]: { time: 6, reservable: 7 },
  [boothYId]: { time: 8, reservable: 9 },
  [boothSunId]: { time: 10, reservable: 11 },
};

export function parseTableToBoothCellData(
  table: HTMLTableElement,
): BoothCellsData {
  const res: BoothCellsData = {};
  allBoothIds.forEach((boothId) => {
    res[boothId] = getBoothCells(table, boothId);
  });
  return res;
}

function getBoothCells(table: HTMLTableElement, boothId: string): BoothCell[] {
  const cells: BoothCell[] = [];
  for (let i = 0; i < table.rows.length; i++) {
    // ヘッダ行をスキップ
    if (i === 0) {
      continue;
    }

    const row = table.rows[i];
    const cell = getBoothCell(row, boothId);

    cells.push(cell);
  }
  return cells;
}

function getBoothCell(row: HTMLTableRowElement, boothId: string): BoothCell {
  const cellIndex = cellIndexPerBooth[boothId];

  const time = row.cells[cellIndex.time].textContent!;
  const reservable = row.cells[cellIndex.reservable].textContent!;
  const anchorElement = row.cells[cellIndex.reservable].childNodes[0]
    ?.childNodes[0] as HTMLAnchorElement | undefined;
  const reservationUrl = anchorElement?.href;

  return new BoothCell({ time, reservable, reservationUrl });
}
