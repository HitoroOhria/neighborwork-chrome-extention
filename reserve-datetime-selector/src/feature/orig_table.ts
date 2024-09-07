const tableParentElement = document.getElementById("mix-anchor")!;

export const origTableElement = tableParentElement
  .childNodes[1] as HTMLTableElement;
const origTbodyElement = origTableElement.childNodes[3] as HTMLElement;

export const appendElementToTableAfter = (el: HTMLElement | string) => {
  origTbodyElement.after(el);
};

export const makeOrigTableHidden = () => {
  origTbodyElement.style.display = "none";
};

export const makeOrigTableDisplay = () => {
  origTbodyElement.style.display = "table-row-group";
};
