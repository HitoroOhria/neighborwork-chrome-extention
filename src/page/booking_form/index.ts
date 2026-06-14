export function init() {
  const bookingConfirmFieldset = document.getElementById(
    "booking-confirm-fieldset",
  );
  if (bookingConfirmFieldset === null) {
    throw new Error("booking-confirm-fieldset not found");
  }

  const table = bookingConfirmFieldset.childNodes[3];
  const tbody = table.childNodes[1];

  const firstRow = tbody.childNodes[0];
  const firstRowTd = firstRow.childNodes[3];
  // e.g. 'Booth 2'
  const boothName = firstRowTd.childNodes[0].textContent;
  if (boothName === null) {
    throw new Error("boothName not found");
  }
  // e.g. '2026年6月15日 17時00分'
  const reservationDateTime = firstRowTd.childNodes[2].textContent?.trim();
  if (reservationDateTime === null) {
    throw new Error("reservationDateTime not found");
  }

  const fourthRow = tbody.childNodes[6];
  const fourthRowTd = fourthRow.childNodes[3];
  // e.g. '30分'
  const reservationDuration = fourthRowTd.childNodes[0].textContent?.trim();
  if (reservationDuration === null) {
    throw new Error("reservationDuration not found");
  }

  // see https://github.com/HitoroOhria/neighborwork-chrome-extention/issues
}
