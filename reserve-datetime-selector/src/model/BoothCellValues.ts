import {
  allBoothIds,
  boothAId,
  boothPId,
  boothRId,
  boothSunId,
  boothTId,
  boothYId,
} from "../feature/booth";
import { BoothCellValue } from "./BoothCellValue";
import { origTableElement } from "../feature/orig_table";

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

// テーブルのブースごとのセルデータ
export class BoothCellValues {
  // { [boothId]: BoothCellValue[] } のブースごとのセルを集めたデータ
  private readonly data: Record<string, BoothCellValue[]>;

  constructor(table: HTMLTableElement) {
    this.data = {};
    allBoothIds.forEach((boothId) => {
      this.data[boothId] = this.getBoothCellValues(table, boothId);
    });
  }

  private getBoothCellValues(
    table: HTMLTableElement,
    boothId: string,
  ): BoothCellValue[] {
    const cellValues: BoothCellValue[] = [];
    for (let i = 0; i < table.rows.length; i++) {
      // ヘッダ行をスキップ
      if (i === 0) {
        continue;
      }

      const row = table.rows[i];
      const cellValue = this.getBoothCellValue(row, boothId);

      cellValues.push(cellValue);
    }
    return cellValues;
  }

  private getBoothCellValue(
    row: HTMLTableRowElement,
    boothId: string,
  ): BoothCellValue {
    const cellIndex = cellIndexPerBooth[boothId];

    const time = row.cells[cellIndex.time].textContent!;
    const reservable = row.cells[cellIndex.reservable].textContent!;
    const anchorElement = row.cells[cellIndex.reservable].childNodes[0]
      ?.childNodes[0] as HTMLAnchorElement | undefined;
    const reservationUrl = anchorElement?.href;

    return new BoothCellValue({ time, reservable, reservationUrl });
  }

  // ブースの予約可能な時間帯の一覧を取得する
  public getBoothReservableTimes(boothId: string): string[] {
    const cellValues = this.data[boothId];

    // 最小の時間からソートされているはずなので、ソート処理はスキップする
    return cellValues
      .filter((cellValue) => cellValue.canReserve())
      .map((cellValue) => cellValue.time);
  }

  // ブースの予約可能な時間帯のうち、一番小さいものの予約 URL を取得する
  public getMinimumTimeReservationUrl(boothId: string): string | undefined {
    const cellValues = this.data[boothId];
    const reservableCellValues = cellValues.filter((cellValue) =>
      cellValue.canReserve(),
    );
    if (reservableCellValues.length === 0) {
      return undefined;
    }

    // 最小の時間からソートされているはずなので、ソート処理はスキップする
    return reservableCellValues[0].reservationUrl;
  }

  public getReservableBoothCellValueAsNull(): Record<
    string,
    Array<BoothCellValue | null>
  > {
    const resp: Record<string, Array<BoothCellValue | null>> = {};
    Object.entries(this.data).forEach(([key, cellValues]) => {
      resp[key] = cellValues.map((value) =>
        value.canReserve() ? null : value,
      );
    });

    return resp;
  }

  // ブース ID と時間帯からセルを検索する
  public findCellValue(arg: {
    boothId: string;
    time: string;
  }): BoothCellValue | undefined {
    const cellValues = this.data[arg.boothId];
    return cellValues.find((cellValue) => cellValue.time === arg.time);
  }

  public getCellValues(boothId: string): BoothCellValue[] {
    return this.data[boothId];
  }
}

export const boothCellValues = new BoothCellValues(origTableElement);
