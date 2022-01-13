import React, { ReactNode } from "react";
import { Property } from "csstype";

interface Props {
  name?: string;
  value?: string;
  justyC?: Property.JustifyContent;
  children?: ReactNode;
}

export function FormDescriptions(props: Props): React.ReactElement {
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          fontSize: 14,
          color: "rgba(0,0,0,.65)",
          display: "flex",
          justifyContent: props?.justyC || "space-between",
        }}
      >
        <div>{props?.name}</div>
        <div>{props?.value}</div>
      </div>
      <div style={{ display: "flex", marginBottom: 10, marginTop: 10 }}>
        {props?.children}
      </div>
    </div>
  );
}
