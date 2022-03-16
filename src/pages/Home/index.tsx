import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./index.scss";

const { List } = require("immutable");

interface Props {}

export const Home = (props: Partial<Props>): React.ReactElement => {
  const navigator = useNavigate();

  const list1 = List([1, 2]);
  const list2 = list1.push(3, 4, 5);
  const list3 = list2.unshift(0);
  const list4 = list1.concat(list2, list3);
  console.log(list1, list2, list3, list4);
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
