import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
interface Props {}

export const Store = (props: Partial<Props>): React.ReactElement => {
  const navigator = useNavigate();

  return (
    <div className="home-body">
      <h1>Store</h1>
      <Button
        onClick={() => {
          navigator("/home");
        }}
        type="link"
      >
        跳转
      </Button>
    </div>
  );
};
