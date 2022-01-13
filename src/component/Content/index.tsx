import React, { useEffect, useState } from "react";
import "./index.css";
import { Input } from "antd";
import { Api } from "../../request/config";

const { Search } = Input;

export const Content: React.FC = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("token", "1da16c481dc54b9c8030dc99ce3bd592");
    // localStorage.removeItem("token");
  }, []);
  const searchFun = async (e?: string) => {
    setLoading(true);
    await Api.getInstance.post({
      url: "/patient/list",
      params: {
        searchName: e,
        page: 1,
        limit: 50,
      },
      withToken: true,
    });
    setLoading(false);
  };

  return (
    <div className="contentCon">
      <Search
        className="search"
        style={{ width: 200 }}
        placeholder="搜索数据"
        type="primary"
        loading={loading}
        enterButton
        onSearch={searchFun}
      />
    </div>
  );
};
