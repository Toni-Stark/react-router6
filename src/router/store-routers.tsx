import React from "react";
import { Outlet } from "react-router-dom";
import { Store } from "../pages/Store";

export const storeRouters = [
  {
    name: "/store",
    element: <Outlet />,
    children: [
      {
        name: "index",
        element: <Store />,
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
