import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./index.scss";
import set = Reflect.set;

interface Props {}

export const Home = (props: Partial<Props>): React.ReactElement => {
  const navigator = useNavigate();


  return (
    <div className="home-body">
      <h1>Home</h1>
      <Button
        onClick={() => {
          navigator("/store");
        }}
        type="link"
      >
        跳转
      </Button>
      {/*<CrossCutting></CrossCutting>*/}
    </div>
  );
};
