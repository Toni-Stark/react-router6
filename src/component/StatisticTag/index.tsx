import React, { ReactNode } from "react";

interface Props {
  name?: string;
  count?: string | number;
}

export function StatisticTag(props: Props): React.ReactElement {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ fontSize: 12, color: "#999" }}>{props?.name}</div>
      <div style={{ fontSize: 24, color: "#666", fontWeight: 700, padding: 7 }}>
        {props?.count}
      </div>
    </div>
  );
}
