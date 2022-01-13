import React, { ReactNode, useEffect, useState } from "react";
import "./index.scss";
import moment from "moment";

interface Props {
  selected?: boolean;
  name?: string;
  done?: string | number;
  total?: string | number;
  month?: Array<string |null>;
  onClick: () => void;
  children?: ReactNode;
}

export function BaseLineComponent(props: Props): React.ReactElement {
  return (
    <div
      style={{
        backgroundColor: props?.selected ? "#42b8a3" : "#fff",
        marginBottom: 10,
        padding: 10,
        boxSizing: "border-box",
        border: "1px solid rgb(242, 242, 242)",
        color: props?.selected ? "#fff" : "#000",
      }}
      onClick={props.onClick}
    >
      <div style={{ marginBottom: 15 }}>
        {props?.name}（{props?.done}/{props?.total}）
      </div>
      <div style={{ whiteSpace: "nowrap" }}>
        {props.month&&props.month[0]?moment(props.month[0])
          .format("YYYY-MM-DD"):null}
        ~ {props.month&&props.month[1]?moment(props.month[1])
          .format("YYYY-MM-DD"):null}
      </div>
    </div>
  );
}
