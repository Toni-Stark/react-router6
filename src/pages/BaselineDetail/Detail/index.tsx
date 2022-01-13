import React, { useEffect, useState, useMemo } from "react";
import { message } from "antd";
import { Demographics } from "./component/demographics";
import { Laboratory } from "./component/laboratory";
import { MedicalHistory } from "./component/medicalHistory";
import { StopMedication } from "./component/stopMedication";
import { KingApi } from "../../../request/king";
import "./index.scss";
import { observer } from "mobx-react";
import { useStore } from "../../../store/useStore";
export const Detail: React.FC = observer(() => {
  const { patientDetailStore } = useStore();
  let default_name_id = patientDetailStore.nameId;
  const [isBtn, setIsBtn] = useState<number | null>(() => {
    if (default_name_id) {
      return parseInt(default_name_id);
    } else return null;
  }); //高亮显示id
  const [patientVisitId, setPatientVisitIdn] = useState<number | null>(); //传给子组件保存id
  const [preservation, setPreservation] = useState<boolean>(false); //保存
  const [formData, setFormData] = useState<any>(); //返回表单数据

  useEffect(() => {
    if (patientDetailStore.isRefresh) {
      getForm(true);
    }
  }, [patientDetailStore.isRefresh]);

  useEffect(() => {
    if (patientDetailStore.tabId) {
      getForm();
    }
    return () => {
      setPatientVisitIdn(null);
      setIsBtn(null);
      setFormData(null);
      setPreservation(false);
    };
  }, [patientDetailStore.tabId]);
  /* 获取表单 */
  const getForm = (current_refresh?: boolean) => {
    KingApi.formApi({ patient_visit_id: patientDetailStore.tabId }).then(
      (res) => {
        if (res.success) {
          setFormData(res.data);
          if (!current_refresh) {
            if (res.data && res.data[0]?.config_sr_content?.name_id) {
              setIsBtn(res.data[0].config_sr_content.name_id);
            }
            setPatientVisitIdn(res.data[0].id);
          }
        } else {
          message.error(res.error);
        }
      }
    );
  };

  const currentRefresh = () => {
    patientDetailStore.isRefresh = true;
  };
  const calendarContext = useMemo(() => {
    if (!isBtn) {
      return null;
    } else if (
      isBtn === 1 ||
      isBtn === 5 ||
      isBtn === 6 ||
      isBtn === 10 ||
      isBtn === 11
    ) {
      return (
        <Demographics
          patientVisitId={patientVisitId}
          preservation={preservation}
          currentRefresh={currentRefresh}
          setPreservation={setPreservation}
          orTab={
            isBtn === 1
              ? 1
              : isBtn === 5
              ? 2
              : isBtn === 6
              ? 3
              : isBtn === 10
              ? 4
              : 5
          }
        />
      );
    } else if (isBtn === 7 || isBtn === 8 || isBtn === 9) {
      return (
        <Laboratory
          patientVisitId={patientVisitId}
          preservation={preservation}
          currentRefresh={currentRefresh}
          setPreservation={setPreservation}
          orTab={isBtn === 7 ? 1 : isBtn === 8 ? 2 : 3}
        />
      );
    } else if (isBtn === 2 || isBtn === 3 || isBtn === 4) {
      return (
        <MedicalHistory
          patientVisitId={patientVisitId}
          preservation={preservation}
          currentRefresh={currentRefresh}
          setPreservation={setPreservation}
          orTab={isBtn === 3 ? 1 : isBtn === 2 ? 2 : 3}
        />
      );
    }
  }, [isBtn, patientVisitId, preservation]);
  return (
    <div className="detail">
      <div className="tabCss">
        {patientVisitId &&
        formData &&
        Array.isArray(formData) &&
        formData.length
          ? formData.map((item) => {
              return (
                <button
                  key={item.id}
                  style={{
                    width: item.config_sr_content?.name?.length > 5 ? 115 : 85,
                    backgroundColor:
                      isBtn === item.config_sr_content?.name_id
                        ? "#fff"
                        : item.status
                        ? "#1abc9c"
                        : "",
                    color:
                      isBtn === item.config_sr_content?.name_id
                        ? "#1abc9c"
                        : "",
                    border:
                      isBtn === item.config_sr_content?.name_id
                        ? "1px solid #1abc9c"
                        : "",
                  }}
                  onClick={() => {
                    setIsBtn(item.config_sr_content?.name_id);
                    patientDetailStore.nameId = item.name_id;
                    setPatientVisitIdn(item.id);
                  }}
                >
                  {item.config_sr_content.name}
                </button>
              );
            })
          : null}
      </div>
      <div>
        {formData?.length === 1 ? (
          <StopMedication
            patientVisitId={patientVisitId}
            preservation={preservation}
            currentRefresh={currentRefresh}
            setPreservation={setPreservation}
          />
        ) : (
          calendarContext
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={{
            marginTop: 20,
            width: 75,
            height: 35,
            backgroundColor: "#1abc9c",
            color: "#fff",
            border: "none",
            borderRadius: 4,
          }}
          onClick={() => setPreservation(true)}
        >
          保存
        </button>
      </div>
    </div>
  );
});
