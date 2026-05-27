export const boothPId = "473";
export const boothAId = "474";
export const boothRId = "475";
export const boothTId = "477";
export const boothYId = "478";
export const boothSunId = "1409";

export type Booth = {
  id: string;
  name: string;
};

export const booths: Booth[] = [
  { id: boothPId, name: "Booth 1" },
  { id: boothAId, name: "Booth 2" },
  { id: boothRId, name: "Booth 3" },
  { id: boothTId, name: "Booth 4" },
  { id: boothYId, name: "Booth 5" },
  { id: boothSunId, name: "Booth Sun" },
];

export const allBoothIds = booths.map((booth) => booth.id);

export function useBooth() {
  return { booths, allBoothIds };
}

export function getBoothName(boothId: string): string {
  const booth = booths.find((booth) => booth.id === boothId);
  if (booth === undefined) {
    throw new Error(`booth is not found. ${boothId}`);
  }

  return booth.name;
}
