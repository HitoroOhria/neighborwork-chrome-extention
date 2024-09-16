import { BoothCell } from "./BoothCell";
import { parseTableToBoothCellData } from "../feature/parseTableToBoothCell";
import { origTableElement, tableCaptionElement } from "./OrigTable";
import { CellNumber, getBoothIdByCellNumber } from "./CellNumber";

export type BoothCellsData = { [boothId: string]: BoothCell[] };

// テーブルのブースごとのセルのデータ
export class BoothCells {
  // セルのデータ
  private readonly data: BoothCellsData;

  constructor(data: BoothCellsData) {
    this.data = data;
  }

  // ブースの予約可能な時間帯の一覧を取得する
  public getBoothReservableTimes(boothId: string): string[] {
    const cells = this.data[boothId];

    // 最小の時間からソートされているはずなので、ソート処理はスキップする
    return cells
      .filter((cell) => cell.canReserve())
      .map((cell) => cell.timeText);
  }

  // ブースの予約可能な時間帯のうち、一番小さいものの予約 URL を取得する
  public getMinimumTimeReservationUrl(boothId: string): string | undefined {
    const cells = this.data[boothId];
    const reservableCells = cells.filter((cell) => cell.canReserve());
    if (reservableCells.length === 0) {
      return undefined;
    }

    // 最小の時間からソートされているはずなので、ソート処理はスキップする
    return reservableCells[0].reservationUrl;
  }

  // ブース ID と時間帯からセルを検索する
  public findBoothCell(arg: {
    boothId: string;
    time: string;
  }): BoothCell | undefined {
    const cells = this.data[arg.boothId];
    return cells.find((cell) => cell.timeText === arg.time);
  }

  public findBoothCellByCellNumber({
    row,
    col,
  }: CellNumber): BoothCell | undefined {
    const boothId = getBoothIdByCellNumber({ row, col });
    if (boothId === undefined) {
      return undefined;
    }

    const cells = this.data[boothId];
    return cells[row - 1];
  }

  public getCells(boothId: string): BoothCell[] {
    return this.data[boothId];
  }
}

const boothCells = new BoothCells(
  parseTableToBoothCellData(origTableElement, tableCaptionElement),
);

export function useBoothCells() {
  return { boothCells };
}
