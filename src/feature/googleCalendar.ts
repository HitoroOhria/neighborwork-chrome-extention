const googleCalendarRegistrationUrl = "https://www.google.com/calendar/render";

const googleCalendarRegistrationBaseParams = {
  action: "TEMPLATE",
};

type RegisterToGoogleCalendarArg = {
  title: string;
  date: Date;
  duration: number;
};

export function registerToGoogleCalendar({
  title,
  date,
  duration,
}: RegisterToGoogleCalendarArg) {
  const url = new URL(googleCalendarRegistrationUrl);

  const params = new URLSearchParams(googleCalendarRegistrationBaseParams);
  // タイトル
  params.append("text", title);
  // 時間
  params.append("dates", formatDatesToGoogleCalendar(date, duration));

  url.search = params.toString();
  window.open(url.toString(), "_blank");
}

function formatDatesToGoogleCalendar(from: Date, duration: number): string {
  const fromStr = formatDateToGoogleCalendar(from);
  const toStr = formatDateToGoogleCalendar(addMinutes(from, duration));

  return `${fromStr}/${toStr}`;
}

function addMinutes(date: Date, duration: number): Date {
  const newDate = new Date(date.toISOString());
  newDate.setMinutes(newDate.getMinutes() + duration);

  return newDate;
}

// "YYYYMMDDTHHmmSSZ" 形式にフォーマットする
function formatDateToGoogleCalendar(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}
