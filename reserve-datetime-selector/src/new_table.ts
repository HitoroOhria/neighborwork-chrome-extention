import { origTbodyElement } from "./orig_table";

// TODO Make by document.createElement
const newTbodyElement = origTbodyElement.cloneNode(true) as HTMLTableElement;

export const createNewTbodyElement = (
  elements: HTMLDivElement[],
): HTMLTableElement => {
  // ヘッダーを調整する
  const headRow = newTbodyElement.rows[0];
  for (let i = 0; i < headRow.cells.length; i++) {
    const cell = headRow.cells[i];
    cell.colSpan = 0;
    cell.className = "article-name"; // WordPress 側で用意されているクラス
  }

  // 3行目移行を削除する
  const deleteRowCount = newTbodyElement.rows.length - 1;
  for (let i = 0; i < deleteRowCount; i++) {
    newTbodyElement.deleteRow(1);
  }

  // 2行目を追加する
  const newRow = newTbodyElement.insertRow();
  const cellCount = 6;
  for (let i = 0; i < cellCount; i++) {
    const newCell = newRow.insertCell();
    newCell.appendChild(elements[i]);
  }

  return newTbodyElement;
};
