import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import "./index.scss";
import { useLocation, useNavigate } from "react-router";
import { HomeOutlined, FileZipOutlined } from "@ant-design/icons";
import { queryToObj } from "../../toos";
/* 图片 */
const { Header, Content } = Layout;

const headerLayout = [
  {
    name: "项目管理",
    key: "1",
    icon: <HomeOutlined />,
    router: "/home",
  },
  {
    name: "数据导出",
    key: "2",
    icon: <FileZipOutlined />,
    router: "/export",
  },
];

const MainLayout = (props: any) => {
  const navigator = useNavigate();
  const history = useLocation();

  const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);
  const [selectKeys, setSelectKeys] = useState<any>();
  const changeLayout = (e: any) => {
    navigator(e.router);
  };

  const resize = () => {
    let height = window.innerHeight;
    setScreenHeight(height);
  };

  const screenChange = () => {
    window.addEventListener("resize", resize);
  };
  useEffect(() => {
    screenChange();
    return () => {
      window.removeEventListener("resize", () => {
        console.log("卸载视图监听");
      });
      window.removeEventListener("popstate", () => {
        console.log("卸载回退按钮监听");
      });
    };
  }, []);

  useEffect(() => {
    if (history.pathname.indexOf("/patientDetail") !== -1) {
      document.title = "患者详情页";
    } else if (history.pathname === "/home") {
      document.title = "项目详情";
    }
    if (history.pathname.indexOf("/home") !== -1) {
      setSelectKeys("1");
    } else if (history.pathname.indexOf("/export") !== -1) {
      setSelectKeys("2");
    }
  }, [history]);

  return (
    <Layout className="mainLayout">
      <Header className="header">
        <div className="logo">临床科研管理系统</div>
        <Menu
          theme="light"
          mode="horizontal"
          className="layout"
          selectedKeys={selectKeys}
        >
          {headerLayout.map((item) => (
            <Menu.Item
              className="layoutItem"
              key={item.key}
              icon={item.icon}
              onClick={() => {
                changeLayout(item);
              }}
            >
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Layout className="body-layout">
        <Layout
          className="mainLayout-content"
          style={{
            height: screenHeight - 50,
            backgroundColor: "#fff",
          }}
        >
          <Content
            style={{
              margin: 0,
              paddingBottom: 10,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export { MainLayout };
