import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

export function Login(): React.ReactElement {
  const navigator = useNavigate();

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          navigator("invoices");
        }}
      >
        登录
      </Button>
    </div>
  );
}
