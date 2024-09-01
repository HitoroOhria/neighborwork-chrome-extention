const phoneBoothIDNameMap = {
  473: "BoothP",
  474: "BoothA",
  475: "BoothR",
  477: "BoothT",
  478: "BoothY",
  1409: "BoothSun",
};

const timeOptions = [
  { key: 0, value: "00:00" },
  { key: 30, value: "00:30" },
  { key: 60, value: "01:00" },
  { key: 90, value: "01:30" },
  { key: 120, value: "02:00" },
  { key: 150, value: "02:30" },
  { key: 180, value: "03:00" },
  { key: 210, value: "03:30" },
  { key: 240, value: "04:00" },
  { key: 270, value: "04:30" },
  { key: 300, value: "05:00" },
  { key: 330, value: "05:30" },
  { key: 360, value: "06:00" },
  { key: 390, value: "06:30" },
  { key: 420, value: "07:00" },
  { key: 450, value: "07:30" },
  { key: 480, value: "08:00" },
  { key: 510, value: "08:30" },
  { key: 540, value: "09:00" },
  { key: 570, value: "09:30" },
  { key: 600, value: "10:00" },
  { key: 630, value: "10:30" },
  { key: 660, value: "11:00" },
  { key: 690, value: "11:30" },
  { key: 720, value: "12:00" },
  { key: 750, value: "12:30" },
  { key: 780, value: "13:00" },
  { key: 810, value: "13:30" },
  { key: 840, value: "14:00" },
  { key: 870, value: "14:30" },
  { key: 900, value: "15:00" },
  { key: 930, value: "15:30" },
  { key: 960, value: "16:00" },
  { key: 990, value: "16:30" },
  { key: 1020, value: "17:00" },
  { key: 1050, value: "17:30" },
  { key: 1080, value: "18:00" },
  { key: 1110, value: "18:30" },
  { key: 1140, value: "19:00" },
  { key: 1170, value: "19:30" },
  { key: 1200, value: "20:00" },
  { key: 1230, value: "20:30" },
  { key: 1260, value: "21:00" },
  { key: 1290, value: "21:30" },
  { key: 1320, value: "22:00" },
  { key: 1350, value: "22:30" },
  { key: 1380, value: "23:00" },
  { key: 1410, value: "23:30" },
];

const filterFutureTimeOptions = () => {
  const now = new Date();
  const todayMinutes = now.getHours() * 60 + now.getMinutes();

  // TODO = でよいか？
  return timeOptions.filter((option) => todayMinutes <= option.key);
};
