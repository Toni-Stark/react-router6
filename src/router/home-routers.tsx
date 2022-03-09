import React from "react";
import { Outlet } from "react-router-dom";
import { UpdateRender } from "../pages/UpdateRender";
import {ColorScreen} from "../pages/ColorScreen";

export const homeRouters = [
  {
    name: "/",
    element: <Outlet />,
    children: [
      {
        name: "index",
        element: <ColorScreen />,
      },
      {
        name: "/update-render",
        element: <UpdateRender />,
      },
      {
        name: "*",
        element: (
          <main style={{ padding: "1rem" }}>
            <p>页面丢失了</p>
          </main>
        ),
      },
    ],
  },
];
