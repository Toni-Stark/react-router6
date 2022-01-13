import React from "react";
import { Outlet } from "react-router-dom";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";

export const router = [
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
  {
    name: "*",
    element: <NotFound />,
  },
];
