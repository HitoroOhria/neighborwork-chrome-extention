import { NWDate } from "../model/NWDate";

const googleCalendarRegistrationUrl = "https://www.google.com/calendar/render";

const googleCalendarRegistrationBaseParams = {
  action: "TEMPLATE",
};

export function openGoogleCalendarRegistration(
  title: string,
  nwDate: NWDate,
  duration: number,
) {
  const url = new URL(googleCalendarRegistrationUrl);

  const params = new URLSearchParams(googleCalendarRegistrationBaseParams);
  // タイトル
  params.append("text", title);
  // 時間
  params.append("dates", formatDatesToGoogleCalendar(nwDate, duration));

  url.search = params.toString();
  window.open(url.toString(), "_blank");
}

function formatDatesToGoogleCalendar(from: NWDate, duration: number): string {
  const fromStr = formatDateToGoogleCalendar(from);
  const toStr = formatDateToGoogleCalendar(from.addMinutes(duration));

  return `${fromStr}/${toStr}`;
}

// "YYYYMMDDTHHmmSSZ" 形式にフォーマットする
function formatDateToGoogleCalendar(nwDate: NWDate): string {
  const date = nwDate.getDate();

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dates = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${year}${month}${dates}T${hours}${minutes}:${seconds}Z`;
}
