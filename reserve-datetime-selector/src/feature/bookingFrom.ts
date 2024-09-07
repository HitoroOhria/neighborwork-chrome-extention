async function getLocalDom(url: string): Promise<Document> {
  return fetch(url)
    .then((res) => res.text())
    .then((text) => {
      const parser = new DOMParser();
      return parser.parseFromString(text, "text/html");
    });
}

export async function submitBookingForm(
  bookingFormUrl: string,
  duration: number,
) {
  const bookingFormDom = await getLocalDom(bookingFormUrl);

  // DOMParser の結果はローカルに保存されるだけなので、document に要素を作成する
  const form = bindForm(bookingFormDom);
  const timeExtensionSelect = bindSelect(
    bookingFormDom,
    "booking[options][time-extension]",
  );
  const options = bindOptions(bookingFormDom);
  const reserveActionButton = bindButton(bookingFormDom, "reserve_action");

  const adultInput = bindInput(bookingFormDom, "booking[client][adult]");
  const seiInput = bindInput(bookingFormDom, "booking[client][sei]");
  const meiInput = bindInput(bookingFormDom, "booking[client][mei]");
  const emailInput = bindInput(bookingFormDom, "booking[client][email]");
  const email2Input = bindInput(bookingFormDom, "booking[client][email2]");
  const bookingNoteInput = bindInput(bookingFormDom, "booking[note]");
  const nonceInput = bindInput(bookingFormDom, "nonce");
  const actionInput = bindInput(bookingFormDom, "action");
  const articleIdInput = bindInput(bookingFormDom, "booking[article_id]");
  const bookingTimeInput = bindInput(bookingFormDom, "booking[booking_time]");
  const userIdInput = bindInput(bookingFormDom, "booking[user_id]");

  document.body.appendChild(form);
  options.forEach((option) => timeExtensionSelect.appendChild(option));
  form.appendChild(timeExtensionSelect);
  form.appendChild(reserveActionButton);
  form.appendChild(adultInput);
  form.appendChild(seiInput);
  form.appendChild(meiInput);
  form.appendChild(emailInput);
  form.appendChild(email2Input);
  form.appendChild(bookingNoteInput);
  form.appendChild(nonceInput);
  form.appendChild(actionInput);
  form.appendChild(articleIdInput);
  form.appendChild(bookingTimeInput);
  form.appendChild(userIdInput);

  timeExtensionSelect.value = `${duration}min`;
  form.submit();
}

function bindForm(doc: Document): HTMLFormElement {
  const form = doc.forms[0];

  const newForm = document.createElement("form");
  newForm.style.display = "none";
  newForm.method = form.method;
  // form.action で input 要素が取得されてしまうため、直接セットする
  newForm.action = "https://sycl.neighborwork.jp/booking-form/";

  return newForm;
}

function bindSelect(doc: Document, name: string) {
  const select = doc.getElementsByName(name)[0] as HTMLSelectElement;

  const newSelect = document.createElement("select");
  newSelect.style.display = "none";
  newSelect.name = select.name;
  newSelect.value = select.value;

  return newSelect;
}

function bindOptions(doc: Document): HTMLOptionElement[] {
  const options = doc.querySelectorAll(
    "option[value*='min']",
  ) as NodeListOf<HTMLOptionElement>;

  const newOptions: HTMLOptionElement[] = [];
  options.forEach((option) => {
    const newOption = document.createElement("option");
    newOption.value = option.value;
    newOption.textContent = option.textContent;

    newOptions.push(newOption);
  });

  return newOptions;
}

function bindButton(doc: Document, name: string) {
  const button = doc.getElementsByName(name)[0] as HTMLButtonElement;

  const newButton = document.createElement("button");
  newButton.style.display = "none";
  newButton.name = button.name;
  newButton.value = button.value;

  return newButton;
}

function bindInput(doc: Document, name: string): HTMLInputElement {
  const input = doc.getElementsByName(name)[0] as HTMLInputElement; // select も渡されるが省略

  const newInput = document.createElement("input");
  newInput.type = "hidden";
  newInput.name = input.name;
  newInput.value = input.value;

  return newInput;
}
