//  "hh:mm" 形式の文字列を返す
import { minReservationDuration } from "./neighborWork";

export function formatToTimeString(time: number) {
  // 時間と分の計算
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  // ゼロ埋めを行い、2桁の文字列に変換
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}

// "hh:mm" 形式の文字列から分を返す
export function getTimeAsMinutes(time: string): number {
  const [hourStr, minutesStr] = time.split(":");
  const hour = Number(hourStr) * 60;
  const minutes = Number(minutesStr);

  return hour + minutes;
}

// "hh:mm" 形式の文字列から次の時刻を返す
// e.g. "11:00" => "11:30"
export function getNextTime(time: string): string {
  const timeNum = getTimeAsMinutes(time);
  const nextTimeNum = timeNum + minReservationDuration;
  return formatToTimeString(nextTimeNum);
}
