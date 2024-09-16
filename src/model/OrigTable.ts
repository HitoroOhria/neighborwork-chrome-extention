// NEIGHBOR WORK フォーンブース予約ページの id=mix-anchor の要素
const mixAnchorElement = document.getElementById("mix-anchor")!;

export const origTableElement = mixAnchorElement
  .childNodes[1] as HTMLTableElement;
export const tableCaptionElement = origTableElement
  .childNodes[1] as HTMLTableCaptionElement;

// e.g. "2024年9月8日(日)"
export function getCaptionText(): string {
  return tableCaptionElement.textContent!;
}

export function appendChildToMixAnchor(node: Node) {
  mixAnchorElement.appendChild(node);
}

export function makeOrigTableHidden() {
  origTableElement.style.display = "none";
}

export function makeOrigTableDisplay() {
  origTableElement.style.display = "table";
}

export function useTableCaption(): HTMLTableCaptionElement {
  return tableCaptionElement;
}
