import React, { ReactNode } from "react";
import { Property } from "csstype";

interface Props {
  name?: string;
  label?: string;
  width?: Property.Width;
  fontWeight?: Property.FontWeight;
  fontSize?: Property.FontSize;
  justifyContent?: Property.JustifyContent;
  status?: string | number;
  children?: ReactNode;
}

enum statusColor {
  "#d9d9d9",
  "#1abc9c",
  "#f5222d",
}

export function FormText(props: Props): React.ReactElement {
  return (
    <div
      style={{
        width: props?.width || "100%",
        display: "flex",
        justifyContent: props?.justifyContent || "flex-start",
        alignItems: "center",
        marginBottom: 14,
      }}
    >
      {props?.status === 0 || props?.status ? (
        <div
          style={{
            borderRadius: 50,
            width: 6,
            height: 6,
            marginRight: 6,
            backgroundColor: statusColor[Number(props?.status)],
          }}
        />
      ) : null}
      <div
        style={{
          marginRight: props?.name ? 2 : 0,
          fontSize: props?.fontSize || 14,
          color: "#666",
        }}
      >
        {props.label}
        {props?.name || props?.children ? "：" : null}
      </div>
      {props?.name ? (
        <div
          style={{
            fontSize: props?.fontSize || 14,
            color: "#999999",
            fontWeight: props?.fontWeight || 400,
          }}
        >
          {props.name}
        </div>
      ) : null}
      {props.children}
    </div>
  );
}
