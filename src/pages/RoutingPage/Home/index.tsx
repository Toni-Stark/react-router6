import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "antd";

interface Props {
  animate: boolean;
}

export function Home(props: Partial<Props>): React.ReactElement {
  let navigate = useNavigate();
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          props.animate && navigate("/");
        }}
      >
        退出登录
      </Button>
      <Button
        onClick={() => {
          navigate("2000");
        }}
      >
        查看商品详情
      </Button>
      <Button
        onClick={() => {
          // 替换当前位置，而不将新位置推送到历史堆栈中
          // navigate("/store", { replace: true });
          // 将新的位置推送到历史堆栈中
          navigate("/store");
        }}
      >
        跳转商城主页
      </Button>
      <Button
        onClick={() => {
          navigate("userinfo");
        }}
      >
        查看用户详情
      </Button>
      <Outlet />
    </div>
  );
}
