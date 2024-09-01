import { getReservationButtonAnchorByBoothId } from "./reservationButton";
import { boothCellValues } from "./boothCellValues";

export const createTimeSelector = (boothId: string): HTMLSelectElement => {
  const select = createSelectElement();

  const boothPTimes = boothCellValues.getBoothReservableTimes(boothId);
  boothPTimes.forEach((time) => {
    const option = createOptionElement({ boothId, text: time });
    select.appendChild(option);
  });

  return select;
};

const createSelectElement = () => {
  const select = document.createElement("select");
  select.className = "minimal";
  select.onchange = handleSelectChange;
  return select;
};

const handleSelectChange = (e: Event) => {
  const select = e.target! as HTMLSelectElement;
  const { boothId, text } = getOptionValueFromStr(select.value);

  const cellValue = boothCellValues.findCellValue({ boothId, time: text });
  const anchor = getReservationButtonAnchorByBoothId(boothId);
  anchor.href = cellValue?.reservationUrl ?? "";
};

const createOptionElement = (arg: { boothId: string; text: string }) => {
  const option = document.createElement("option");
  option.value = crateOptionValueStr(arg);
  option.textContent = arg.text;
  return option;
};

const optionValueDelimiter = "-";

type OptionValue = {
  boothId: string;
  text: string;
};

const crateOptionValueStr = (value: OptionValue): string => {
  return value.boothId + optionValueDelimiter + value.text;
};

const getOptionValueFromStr = (value: string): OptionValue => {
  const values = value.split(optionValueDelimiter);
  return {
    boothId: values[0],
    text: values[1],
  };
};
