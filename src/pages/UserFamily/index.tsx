import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { Outlet } from "react-router-dom";

export function UserFamily(): React.ReactElement {
  const navigate = useNavigate();

  return (
    <div>
      <p>用户信息列表</p>
      <Button
        onClick={() => {
          navigate("4");
        }}
      >
        查看详情
      </Button>
      <Outlet />
    </div>
  );
}
