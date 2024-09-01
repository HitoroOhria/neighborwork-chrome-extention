const reservableChar = "○";
// const nonReservableChar = '－'

// テーブルの時間帯ごとのブースのセル
export class BoothCellValue {
  // ブースのセルの時間 (e.g. '10:30')
  time: string;
  // ブースのセルの予約可能フラグ ('○' | '－')
  reservable: string;
  // ブース予約のURL
  reservationUrl: string | undefined;

  constructor(arg: {
    time: string;
    reservable: string;
    reservationUrl: string | undefined;
  }) {
    this.time = arg.time;
    this.reservable = arg.reservable;
    this.reservationUrl = arg.reservationUrl;
  }

  // ブースのセルの時間帯が予約可能か判定する
  canReserve(): boolean {
    return this.reservable === reservableChar;
  }
}
