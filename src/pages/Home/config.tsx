import React from "react";
import moment from "moment";
import { Progress } from "antd";

const getGender = (type?: string | number) => {
  switch (type) {
    case "1":
    case 1:
      return "男";
    case "2":
    case 2:
      return "女";
    default:
      return "";
  }
};

// 患者列表配置
export const tableColumns: any = [
  {
    title: "序号",
    dataIndex: "id",
    width: 50,
  },
  {
    title: "姓名",
    dataIndex: "patient_name",
    render: (text?: string) => (
      <div style={{ color: "#1abc9c" }}>{text?.toString() || "/"}</div>
    ),
  },
  {
    title: "ID号",
    dataIndex: "uuid",
    render: (text?: string | number) => text?.toString() || "/",
  },
  {
    title: "受试者编号",
    dataIndex: "patient_num",
  },
  {
    title: "姓名缩写",
    dataIndex: "pinyin",
  },
  {
    title: "性别",
    dataIndex: "gender",
    render: (text?: string | number) => getGender(text),
  },
  {
    title: "年龄",
    dataIndex: "birthday",
    render: (text: any) => {
      if (text) {
        return (
          <div>
            {Number(moment(new Date()).format("YYYY")) -
              Number(moment(text).format("YYYY"))}
          </div>
        );
      } else return "/";
    },
  },
  {
    title: "入组时间",
    dataIndex: "created_at",
    render: (text: any) => {
      if (text) {
        return <div>{moment(text).format("YYYY-MM-DD")}</div>;
      } else {
        return "/";
      }
    },
  },
  {
    title: "进度",
    dataIndex: "schedule",
    width: 100,
    render: (text: string | number) => {
      if (typeof text === "string") {
        return "已完成";
      } else {
        return (
          <div>
            <Progress
              percent={text}
              strokeWidth={6}
              style={{ fontSize: 12 }}
              strokeColor="#1abc9c"
            />
          </div>
        );
      }
    },
  },
  {
    title: "本期访视",
    dataIndex: "this_patient_visit",
    render: (text: any) => text?.name,
  },
  {
    title: "过期访视",
    dataIndex: "expired_visit",
    render: (text: any) => text?.toString() || "/",
  },
];
