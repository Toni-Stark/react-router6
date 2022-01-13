import React, { ReactNode } from "react";
import moment from "moment";
import "./index.scss";
interface Props {
  name?: string;
  updated_at?: string;
  children?: ReactNode;
}

export function MessageItem(props: Props): React.ReactElement {
  let time: any = props.updated_at
    ? Number(moment(new Date()).diff(props.updated_at)) / 1000 / 3600
    : undefined;
  let timeStr = "小时";
  if (time) {
    if (time < 1) {
      time = (time * 60).toString().split(".")[0];
      timeStr = "分钟";
    } else if (time > 24) {
      time = (time / 24).toString().split(".")[0];
      timeStr = "天";
    } else if (time > 1) {
      time = time.toString().split(".")[0];
      timeStr = "小时";
    }
  }

  return (
    <div className="message-item">
      <div style={{ fontWeight: "bold" }}>{props?.name}</div>
      {props.children}
      {time ? (
        <div style={{ marginTop: 15, fontSize: 12, color: "#999" }}>
          {time}
          {timeStr}前
        </div>
      ) : null}
    </div>
  );
}
