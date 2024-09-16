import { parseNumber } from "./number";
import { NWDate } from "../model/NWDate";

const reservationUrl = "https://sycl.neighborwork.jp/booking-form";

// https://sycl.neighborwork.jp/booking-form/?aid=1409&utm=1726533000 が渡ってくる
export function parseReservationUrl(urlStr: string): {
  boothId: string;
  nwUnix: number;
} {
  const url = new URL(urlStr);
  const params = new URLSearchParams(url.search);

  const boothId = params.get("aid");
  if (boothId === null) {
    throw new Error(`'aid' query param not found. ${urlStr}`);
  }

  const unixStr = params.get("utm");
  if (unixStr === null) {
    throw new Error(`'utm' query param not found. ${urlStr}`);
  }
  const [nwUnix, ok] = parseNumber(unixStr);
  if (!ok) {
    throw new Error(`'utm' query param is not number. ${urlStr}`);
  }

  return { boothId, nwUnix };
}

// https://sycl.neighborwork.jp/booking-form/?aid=1409&utm=1726533000 を返す
export function getReservationUrl(boothId: string, nwDate: NWDate): string {
  const url = new URL(reservationUrl);
  const params = new URLSearchParams();

  params.append("aid", boothId);
  params.append("utm", nwDate.nwUnix.toString());

  url.search = params.toString();

  return url.toString();
}
