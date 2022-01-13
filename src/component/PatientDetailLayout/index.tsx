import React from "react";
import "./index.scss";
import { FormText } from "../FormText";
import { observer } from "mobx-react";
import { useStore } from "../../store/useStore";

interface PatientDetailLayoutProps {
  children?: React.ReactChild;
}

const DetailLayout = observer((props: PatientDetailLayoutProps) => {
  const { patientDetailStore } = useStore();
  return (
    <div className="patient-layout-content">
      <div className="content-banner">
        <div style={{ fontSize: 16, fontWeight: "bold" }}>
          {patientDetailStore?.tabTitle}
        </div>
        <div style={{ display: "flex", marginTop: 10 }}>
          <FormText
            label="访视内容"
            name={patientDetailStore?.total}
            fontWeight={400}
          />
          <FormText
            label="已完成"
            name={patientDetailStore?.finishCount}
            fontWeight={400}
          />
        </div>
      </div>
      <div
        style={{
          height: "100%",
          width: "100%",
          marginTop: 10,
        }}
      >
        {props?.children}
      </div>
    </div>
  );
});
export { DetailLayout };
