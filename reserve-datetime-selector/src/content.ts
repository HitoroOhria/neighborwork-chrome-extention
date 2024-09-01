import { createTimeSelector } from "./timeSelect";
import { allBoothIds } from "./booth";
import { createReservationButtonElement } from "./reservationButton";
import { boothCellValues } from "./boothCellValues";
import { createNewTbodyElement } from "./new_table";
import { appendElementToTableAfter, makeOrigTableHidden } from "./orig_table";

console.log("hello!!");

window.onload = () => {
  const containers = allBoothIds.map((boothId) => {
    const timeSelector = createTimeSelector(boothId);
    const href = boothCellValues.getMinimumTimeReservationUrl(boothId) ?? "";
    const reservationButton = createReservationButtonElement({ boothId, href });

    return createVerticalContainer(timeSelector, reservationButton);
  });

  makeOrigTableHidden();
  const newTbody = createNewTbodyElement(containers);
  appendElementToTableAfter(newTbody);
};

const createVerticalContainer = (
  ...children: HTMLElement[]
): HTMLDivElement => {
  const div = document.createElement("div");
  div.className = "vertical-container";
  children.forEach((child) => div.appendChild(child));

  return div;
};
