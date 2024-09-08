import { booths } from "./Booth";

export type CellNumber = {
  row: number;
  col: number;
};

export function getBoothIdByCellNumber({
  col,
}: CellNumber): string | undefined {
  return booths.at(col - 1)?.id;
}

export function getColNumberByBoothId(boothId: string): number {
  return booths.findIndex((booth) => booth.id === boothId) + 1;
}
