export function formatToTimeString(time: number) {
  // 時間と分の計算
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  // ゼロ埋めを行い、2桁の文字列に変換
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  // "hh:mm" 形式の文字列を返す
  return `${formattedHours}:${formattedMinutes}`;
}

export function getTimeAsMinutes(time: string): number {
  const [hourStr, minutesStr] = time.split(":");
  const hour = Number(hourStr) * 60;
  const minutes = Number(minutesStr);

  return hour + minutes;
}
