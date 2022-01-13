import React, { useEffect, useState, useMemo } from "react";
import { Descriptions, message } from "antd";
import "./index.scss";
import { BaseLineComponent } from "../../component/BaselineComponent";
import { Outlet } from "react-router-dom";
import { KingApi } from "../../request/king";
import { useLocation, useNavigate } from "react-router";
import { columnsBanner } from "./config";
import { queryToObj } from "../../toos";
import { observer } from "mobx-react";
import { useStore } from "../../store/useStore";
interface Props {}

export const PatientDetail = observer(
  (props: Partial<Props>): React.ReactElement => {
    const location = useLocation();
    const navigator = useNavigate();
    const { patientDetailStore } = useStore();
    const searchParams: any = queryToObj(location.search);
    const [selected, setSelected] = useState<string | number | null>();
    const [visitData, setVisitData] = useState<any>(); //访视数据
    const [data, setData] = useState<any>({});
    const [tabId, setTabId] = useState<any>(); //访视数据
    const [finishCount, setFinishCount] = useState<any>(); //访视数据

    useEffect(() => {
      getVisit();
      let data: any = localStorage.getItem("patient_data");
      if (data) {
        setData({ ...JSON.parse(data) });
      }
    }, []);

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
      if (patientDetailStore.isRefresh) {
        let params: any = queryToObj(location.search);
        patientDetailStore.isRefresh = false;
        KingApi.visitApi({ id: searchParams?.id }).then((res: any) => {
          if (res.success) {
            setVisitData(res.data);
            let finish = res.data.find((item: any) => selected === item.id);
            navigator(
              `/home/patientDetail/detail?id=${searchParams?.id}&tab_id=${params?.tab_id}&total=${params?.total}&finish_count=${finish?.finish_count}`,
              { replace: true }
            );
          } else {
            message.error(res.error);
          }
        });
      }
    }, [patientDetailStore.isRefresh]);

    // 获取访视
    const getVisit = () => {
      KingApi.visitApi({ id: searchParams?.id }).then((res: any) => {
        if (res.success) {
          setVisitData(res.data);
          setSelected(res.data[0]?.id);
          patientDetailStore.detailId = searchParams?.id;
          patientDetailStore.tabTitle = res.data[0]?.name.toString();
          patientDetailStore.finishCount = res.data[0]?.finish_count.toString();
          patientDetailStore.total = res.data[0]?.total.toString();
          patientDetailStore.tabId = res.data[0]?.id;
          // navigator(
          //   `detail?id=${searchParams?.id}&tab_id=${res.data[0]?.id}&total=${res.data[0]?.total}&finish_count=${res.data[0]?.finish_count}`
          // );
        } else {
          message.error(res.error);
        }
      });
    };
    const checkBaseline = (params: any) => {
      setFinishCount(params?.finish_count);
      setTabId(params.id);
      patientDetailStore.detailId = searchParams?.id;
      patientDetailStore.tabTitle = params?.name.toString();
      patientDetailStore.finishCount = params?.finish_count.toString();
      patientDetailStore.total = params?.total.toString();
      patientDetailStore.tabId = params?.id;
      // navigator(
      //   `detail?id=${searchParams?.id}&tab_id=${params.id}&total=${params?.total}&finish_count=${params?.finish_count}`
      // );
    };

    const currentHeaderMemo = useMemo(() => {
      let selectData = visitData?.find((item: any) => item.id === selected);
      if (selectData?.begin_date || selectData?.end_date) {
        data[
          "current_time_at"
        ] = `${selectData?.begin_date} ~ ${selectData?.end_date}`;
      } else {
        data["current_time_at"] = "";
      }
      data["current_name"] = selectData?.name;
      return (
        <Descriptions bordered>
          {columnsBanner.map((item, index) => {
            return (
              <Descriptions.Item
                key={index}
                labelStyle={{
                  width: 200,
                  backgroundColor: "#f5f5f5",
                  textAlign: "end",
                }}
                style={{ height: 51 }}
                label={item.name + "："}
                span={item.span}
              >
                {data[item.key]}
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      );
    }, [data, selected]);

    return (
      <div className="patientDetail">
        {currentHeaderMemo}
        <div className="sider">
          <div style={{ minWidth: 200 }}>
            {visitData && Array.isArray(visitData) && visitData.length
              ? visitData.map((item, index) => {
                  return (
                    <BaseLineComponent
                      key={item.id}
                      name={item.name}
                      selected={selected === item.id}
                      done={item.finish_count ? item.finish_count : 0}
                      total={item.total ? item.total : 0}
                      month={[item.begin_date, item.end_date]}
                      onClick={() => {
                        setSelected(item.id);
                        checkBaseline(item);
                      }}
                    />
                  );
                })
              : null}
          </div>
          <Outlet />
        </div>
      </div>
    );
  }
);
