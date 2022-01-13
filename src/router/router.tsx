import React from "react";
import { MainLayout } from "../component/MainLayout";
import { Export } from "../pages/Export";
import { Outlet } from "react-router-dom";
import { PatientDetail } from "../pages/PatientDetail";
import { Detail } from "../pages/BaselineDetail/Detail";
import { Home } from "../pages/Home";
import { DetailLayout } from "../component/PatientDetailLayout";
import { NotFound } from "../pages/NotFound";

export const router = [
  {
    name: "/home",
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        name: "index",
        element: <Home />,
      },
      {
        name: "patientDetail",
        element: <PatientDetail />,
        children: [
          {
            name: "index",
            element: <Detail />,
          },
          {
            name: "detail",
            element: (
              <DetailLayout>
                <Detail />
              </DetailLayout>
            ),
          },
          {
            name: "*",
            element: (
              <main style={{ padding: "1rem" }}>
                <p>未查询到数据</p>
              </main>
            ),
          },
        ],
      },
      {
        name: "*",
        element: (
          <main style={{ padding: "1rem" }}>
            <p>未找到该用户</p>
          </main>
        ),
      },
    ],
  },
  {
    name: "/export",
    element: (
      <MainLayout>
        <Export />
      </MainLayout>
    ),
  },
  {
    name: "*",
    element: <NotFound />,
  },
];
