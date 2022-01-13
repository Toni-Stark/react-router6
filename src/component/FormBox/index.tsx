import React, { ReactNode } from "react";
import { Property } from "csstype";

interface Props {
  name?: string;
  children?: ReactNode;
  flexDirection?: Property.FlexDirection;
}

export function FormBox(props: Props): React.ReactElement {
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          fontSize: 14,
          color: "#666",
          fontWeight: 700,
          marginBottom: 10,
        }}
      >
        {props.name}
      </div>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: props?.flexDirection ? props.flexDirection : "column",
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
