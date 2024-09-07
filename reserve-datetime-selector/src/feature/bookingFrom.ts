async function fetchPageDocument(url: string): Promise<Document> {
  return fetch(url)
    .then((res) => res.text())
    .then((text) => {
      const parser = new DOMParser();
      return parser.parseFromString(text, "text/html");
    });
}

export async function clickBookingFormButton(
  bookingFormUrl: string,
  duration: number,
) {
  const bookingForm = await fetchPageDocument(bookingFormUrl);

  const timeSelect = bookingForm.getElementById(
    "booking-option-time-extension",
  ) as HTMLSelectElement;
  timeSelect.value = `${duration}min`;

  const buttonDiv = document.getElementById("action-button") as HTMLDivElement;
  const button = buttonDiv.childNodes[1] as HTMLButtonElement;

  button.click();
}
