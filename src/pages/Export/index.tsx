import React, { useState } from "react";
import { Button, Select, DatePicker, Table } from "antd";
import "./index.scss";
import { tableColumns } from "./config";
import { CurrentPaginationType } from "../../request/types";
const { Option } = Select;
const { RangePicker } = DatePicker;

interface Props {}

export function Export(props: Partial<Props>): React.ReactElement {
  const [total, setTotal] = useState(500);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const currentPagination: CurrentPaginationType = (
    page: number,
    limit: number
  ) => {
    let currentPage = limit === pageSize ? page : 1;
    setPageSize(pageSize);
    setPage(currentPage);
  };

  return (
    <div className="export">
      <div className="search-header">
        <div className="config">
          <Select placeholder="请选择项目" style={{ minWidth: 150 }}>
            <Option value={1}>项目一</Option>
            <Option value={2}>项目一</Option>
            <Option value={3}>项目一</Option>
            <Option value={4}>项目一</Option>
          </Select>
          <Select
            placeholder="请选择状态"
            style={{ minWidth: 150, marginLeft: 15 }}
          >
            <Option value={1}>所有</Option>
            <Option value={2}>已过期</Option>
            <Option value={3}>成功</Option>
          </Select>
          <RangePicker style={{ marginLeft: 15 }} />
        </div>
        <div style={{ width: 100 }}>
          <Button>重置</Button>
        </div>
      </div>
      <div style={{ backgroundColor: "#ffffff" }}>
        <Table
          style={{ marginTop: 15 }}
          bordered={true}
          rowKey={(row: any) => row.id.toString()}
          columns={tableColumns}
          dataSource={[]}
          onRow={() => {
            return {
              onClick: () => {},
            };
          }}
          pagination={{
            pageSizeOptions: ["10", "20", "50", "100"],
            showTotal: (total) => `共 ${total} 条数据`, // 用于显示数据总量和当前数据顺序
            showSizeChanger: true,
            showQuickJumper: true,
            current: page,
            pageSize: pageSize,
            total: total,
            onChange: currentPagination,
          }}
        />
      </div>
    </div>
  );
}
