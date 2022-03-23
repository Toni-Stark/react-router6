import React, { useMemo } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { homeRouters } from "./router/home-routers";
import { storeRouters } from "./router/store-routers";
import { ConfigProvider } from "antd";
import zh_CH from "antd/lib/locale-provider/zh_CN";
import "moment/locale/zh-cn";

export const App = () => {
  // useRouter() --- Hooks实现
  const useRoutes = useMemo(() => {
    const instantiation = (route: any) => {
      if (route.name === "index") {
        return <Route key={route.key} index element={route.element} />;
      } else {
        return (
          <Route key={route.key} path={route.name} element={route.element}>
            {route?.children &&
              route.children.map((item: any, key: any) => {
                return instantiation({ ...item, key });
              })}
          </Route>
        );
      }
    };
    console.log("路由发生了变化", window.location);
    return (
      <Routes>
        {homeRouters?.map((item: any, key: any) => {
          return instantiation({ ...item, key });
        })}
        {storeRouters?.map((item: any, key: any) => {
          return instantiation({ ...item, key });
        })}
      </Routes>
    );
  }, []);

  return (
    <ConfigProvider locale={zh_CH}>
      <HashRouter>{useRoutes}</HashRouter>
    </ConfigProvider>
  );
};
