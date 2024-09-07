import { CSSProperties } from "react";

export const boxStyle: CSSProperties = {
  borderRadius: "4px",
  boxShadow: [
    "0px 6px 10px 0px rgba(0, 0, 0, .14)",
    "0px 1px 18px 0px rgba(0, 0, 0, .12)",
    "0px 3px 5px -1px rgba(0, 0, 0, .2)",
  ].join(","),
};
