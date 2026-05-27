export const booth1Id = "473";
export const booth2Id = "474";
export const booth3Id = "475";
export const booth4Id = "477";
export const booth5Id = "478";
export const boothSunId = "1409";

export type Booth = {
  id: string;
  name: string;
};

export const booths: Booth[] = [
  { id: booth1Id, name: "Booth 1" },
  { id: booth2Id, name: "Booth 2" },
  { id: booth3Id, name: "Booth 3" },
  { id: booth4Id, name: "Booth 4" },
  { id: booth5Id, name: "Booth 5" },
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
