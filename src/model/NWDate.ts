// Neighbor Work の予約時刻
// Unix 時間で表現されているが TZ を暗黙的に JST として扱っているしている
// e.g. 1726531200
//  - UTC           => 2024年9月17日 00:00 UTC
//  - JST           => 2024年9月17日 09:00 JST
//  - Neighbor Work => 2024年9月17日 00:00 JST (時刻は UTC だが、表示しているのは JST としてである)
export class NWDate {
  // Neighbor Work 上の Unix 時刻
  private date: Date;

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

  // JST 表示の年
  get day(): number {
    return this.date.getUTCDay();
  }

  // JST 表示の時
  get hour(): number {
    return this.date.getUTCHours();
  }

  // JST 表示の分
  get minutes(): number {
    return this.date.getUTCMinutes();
  }

  // 2桁に0埋めした時
  get hourText(): string {
    return String(this.hour).padStart(2, "0");
  }

  // 2桁に0埋めした分
  get minutesText(): string {
    return String(this.minutes).padStart(2, "0");
  }

  // Neighbor Work システムで扱う Unix
  get nwUnix(): number {
    return Math.floor(this.date.getTime() / 1000);
  }

  get normalUnix(): number {
    const jstDate = new Date(
      `${this.year}-${this.month}-${this.day}T${this.hour}:${this.minutes}:00+09:00`,
    );

    return Math.floor(jstDate.getTime() / 1000);
  }
}
