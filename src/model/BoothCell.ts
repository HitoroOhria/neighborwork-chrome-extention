import { NWDate } from "./NWDate";
import { getReservationUrl } from "../feature/reservationUrl";

const reservableChar = "○";
const reservedChar = "×";
const notAvailableChar = "－";

const reservableFlags = [
  reservableChar,
  reservedChar,
  notAvailableChar,
] as const;
type ReservableFlag = (typeof reservableFlags)[number];

// テーブルのブースのセル
export class BoothCell {
  // ブース ID
  boothId: string;

  // Neighbor Work 上の時刻
  nwDate: NWDate;

  // ブースのセルの予約可能フラグ
  reservableFlag: ReservableFlag;

  constructor(arg: {
    boothId: string;
    nwDate: NWDate;
    reservableFlag: string;
  }) {
    if (!reservableFlags.includes(arg.reservableFlag as ReservableFlag)) {
      throw new Error(`Invalid reservable flag. ${arg.reservableFlag}`);
    }

    this.boothId = arg.boothId;
    this.nwDate = arg.nwDate;
    this.reservableFlag = arg.reservableFlag as ReservableFlag;
  }

  get timeText(): string {
    return `${this.nwDate.hourText}:${this.nwDate.minutesText}`;
  }

  // 予約 URL
  get reservationUrl(): string {
    return getReservationUrl(this.boothId, this.nwDate);
  }

  // ブースのセルの時間帯が予約可能か判定する
  canReserve(): boolean {
    return this.reservableFlag === reservableChar;
  }

  reserved(): boolean {
    return [reservedChar, notAvailableChar].includes(this.reservableFlag);
  }
}
