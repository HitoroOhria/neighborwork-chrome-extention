// Neighbor Work の予約時刻
// Unix 時間で表現されているが TZ を暗黙的に JST として扱っているしている
// e.g. 1726531200
//  - UTC           => 2024年9月17日 00:00 UTC
//  - JST           => 2024年9月17日 09:00 JST
//  - Neighbor Work => 2024年9月17日 00:00 JST (時刻は UTC だが、表示しているのは JST としてである)
export class NWDate {
  // Neighbor Work 上の Unix 時刻
  public date: Date;

  constructor(nwDate: Date) {
    this.date = nwDate;
  }

  // JST 表示の年
  get year(): number {
    return this.date.getUTCFullYear();
  }

  // JST 表示の月
  get month(): number {
    return this.date.getUTCMonth() + 1;
  }

  // JST 表示の日
  get dates(): number {
    return this.date.getUTCDate();
  }

  // JST 表示の時
  get hours(): number {
    return this.date.getUTCHours();
  }

  // JST 表示の分
  get minutes(): number {
    return this.date.getUTCMinutes();
  }

  // 2桁に0埋めした月
  get monthText(): string {
    return String(this.month).padStart(2, "0");
  }

  // 2桁に0埋めした日
  get datesText(): string {
    return String(this.dates).padStart(2, "0");
  }

  // 2桁に0埋めした時
  get hoursText(): string {
    return String(this.hours).padStart(2, "0");
  }

  // 2桁に0埋めした分
  get minutesText(): string {
    return String(this.minutes).padStart(2, "0");
  }

  // Neighbor Work システムで扱う Unix
  get nwUnix(): number {
    return Math.floor(this.date.getTime() / 1000);
  }

  get isoStringWithoutTZ(): string {
    return `${this.year}-${this.monthText}-${this.datesText}T${this.hoursText}:${this.minutesText}:00`;
  }

  // タイムゾーンが本来の値に調整された Date
  getDate(): Date {
    return new Date(`${this.isoStringWithoutTZ}+09:00`);
  }

  addMinutes(minutes: number): NWDate {
    const newDate = new Date(this.date.toISOString());
    newDate.setMinutes(newDate.getMinutes() + minutes);

    return new NWDate(newDate);
  }
}
