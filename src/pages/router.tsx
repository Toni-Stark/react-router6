import { Home } from "./RoutingPage/Home";
import { Invoice } from "./RoutingPage/Home/Invoice";
import React from "react";
import { Login } from "./RoutingPage/Login";
import { Userinfo } from "./RoutingPage/UserInfo";
import { UserFamily } from "./UserFamily";
import { Store } from "./RoutingPage/Store";

export const router = [
  {
    name: "/",
    element: <Login />,
  },
  {
    name: "invoices",
    element: <Home animate={true} />,
    children: [
      {
        name: "index",
        element: (
          <main style={{ padding: "1rem" }}>
            <p>Select an invoice</p>
          </main>
        ),
      },
      {
        name: ":invoiceId",
        element: <Invoice />,
      },
      {
        name: "userinfo",
        element: <UserFamily />,
        children: [
          {
            name: "index",
            element: (
              <main>
                <p>Please Select You Want Search Userinfo</p>
              </main>
            ),
          },
          {
            name: ":userId",
            element: <Userinfo />,
          },
        ],
      },
    ],
  },
  {
    name: "store",
    element: <Store />,
  },
  {
    name: "*",
    element: (
      <main style={{ padding: "1rem" }}>
        <p>There's nothing here!</p>
      </main>
    ),
  },
];
