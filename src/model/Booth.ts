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
  { id: boothPId, name: "Booth P" },
  { id: boothAId, name: "Booth A" },
  { id: boothRId, name: "Booth R" },
  { id: boothTId, name: "Booth T" },
  { id: boothYId, name: "Booth Y" },
  { id: boothSunId, name: "Booth Sun" },
];

export const allBoothIds = booths.map((booth) => booth.id);

export function useBooth() {
  return { booths, allBoothIds };
}
