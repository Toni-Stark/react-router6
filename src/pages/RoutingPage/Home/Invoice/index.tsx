import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

interface Props {}
import { getInvoice } from "../data";

export function Invoice() {
  let params = useParams();
  let invoiceId = params.invoiceId;
  let invoice = getInvoice(
    parseInt(typeof invoiceId === "string" ? invoiceId : "", 10)
  );
  return (
    <main style={{ padding: "1rem" }}>
      <h2>Total Due: {invoice?.amount}</h2>
      <p>
        {invoice?.name}: {invoice?.number}
      </p>
      <p>Due Date: {invoice?.due}</p>
    </main>
  );
}
