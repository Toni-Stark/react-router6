import { Button } from "antd";

export const tableColumns: any = [
  {
    title: "序号",
    dataIndex: "id",
    width: 70,
  },
  {
    title: "导出名称",
    dataIndex: "export_name",
    render: (text?: string) => (
      <div style={{ color: "#1abc9c" }}>{text?.toString() || "/"}</div>
    ),
  },
  {
    title: "开始时间",
    dataIndex: "start_at",
    render: (text?: string | number) => text?.toString() || "/",
  },
  {
    title: "结束时间",
    dataIndex: "end_at",
  },
  {
    title: "有效期",
    dataIndex: "time_of_validity",
  },
  {
    title: "状态",
    dataIndex: "status",
  },
  {
    title: "大小",
    dataIndex: "files",
  },
  {
    title: "操作",
    render: () => <Button>下载</Button>,
  },
];
