export const createReservationButtonElement = (arg: {
  boothId: string;
  href: string;
}): HTMLAnchorElement => {
  const anchor = createAnchorElement(arg);
  const button = createButtonElement();
  anchor.appendChild(button);

  return anchor;
};

const createAnchorElement = (arg: {
  boothId: string;
  href: string;
}): HTMLAnchorElement => {
  const anchor = document.createElement("a");
  anchor.id = getAnchorId(arg.boothId);
  anchor.href = arg.href;
  return anchor;
};

const anchorIdPrefix = "reservation-button-";

const getAnchorId = (boothId: string): string => {
  return anchorIdPrefix + boothId;
};

const createButtonElement = (): HTMLButtonElement => {
  const button = document.createElement("button");
  button.textContent = "予約";
  button.className = "reservation-button";
  return button;
};

export const getReservationButtonAnchorByBoothId = (
  boothId: string,
): HTMLAnchorElement => {
  const id = getAnchorId(boothId);
  return document.getElementById(id)! as HTMLAnchorElement;
};
