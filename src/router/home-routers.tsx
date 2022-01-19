import React from "react";
import { Outlet } from "react-router-dom";
import { Home } from "../pages/Home";

export const homeRouters = [
  {
    name: "/home",
    element: <Outlet />,
    children: [
      {
        name: "index",
        element: <Home />,
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
