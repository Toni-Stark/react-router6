import React, { useState, useEffect, useCallback } from "react";
import { Descriptions, DatePicker, Radio, Input, message, Space } from "antd";
import moment from "moment";
import "./index.scss";
import { KingApi } from "../../../../../request/king";
import { stopDatas } from "./datas";
const { TextArea } = Input;
interface IProps {
  patientVisitId: number | null | undefined;
  preservation: boolean;
  currentRefresh: () => void;
  setPreservation: Function;
}
/* 停止用药 */
export const StopMedication: React.FC<IProps> = (props) => {
  const [orInquiry, setOrInquiry] = useState<boolean>(false); //是否为质询
  const [data, setData] = useState<any>({});
  const [sonPatientVisitId, setsonPatientVisitId] = useState<
    number | null | undefined
  >();
  useEffect(() => {
    if (props.preservation) {
      submit();
    }
    if (props.patientVisitId) {
      if (props.patientVisitId !== sonPatientVisitId) {
        setsonPatientVisitId(props.patientVisitId);
        getData();
      }
    }
    return () => {
      setOrInquiry(false);
    };
  }, [props.preservation, props.patientVisitId]);
  // 查询
  const getData = () => {
    KingApi.stopApi({ visit_content_id: props.patientVisitId }).then((res) => {
      if (res.success) {
        if (res.data) {
          setData(res.data);
        } else {
          setData({});
        }
      } else {
        message.error(res.error);
      }
    });
  };
  // 提交
  const submit = () => {
    KingApi.submitStopApi({
      visit_content_id: props.patientVisitId,
      ...data,
    }).then((res) => {
      if (res.success) {
        message.success(res.error);
        props.currentRefresh();
      } else {
        message.error(res.error);
      }
      props.setPreservation(false);
    });
  };
  // 修改事件
  const dataChange = (val: any, keys: string, type: number) => {
    const _data: any = { ...data };
    if (type === 1) {
      _data[keys] = val;
    } else if (type === 2) {
      _data[keys] = val.target.value;
    } else if (type === 3) {
      _data[keys] = moment(val).format("YYYY-MM-DD");
    }

    setData(_data);
  };
  // 基础信息查询
  return (
    <div className="stopMedication">
      <button
        onClick={() => setOrInquiry(false)}
        style={{
          backgroundColor: orInquiry ? "#fafafa" : "#fff",
          color: orInquiry ? "#000" : "#1abc9c",
          marginBottom: 3,
          marginRight: 3,
        }}
      >
        停止用药
      </button>
      {/* <button onClick={()=>setOrInquiry(true)} style={{
        backgroundColor:orInquiry?'#fff':'#fafafa',
        color:orInquiry?'#1abc9c':'#000',
      }}>质询</button> */}
      {orInquiry ? null : (
        <Descriptions
          labelStyle={{ width: "20%" }}
          bordered
          style={{ backgroundColor: "#fff" }}
        >
          {stopDatas && Array.isArray(stopDatas) && stopDatas.length
            ? stopDatas.map((item) => {
                if (item.types === "date") {
                  let date: any =
                    data && data[item.keys]
                      ? moment(data[item.keys]).format("YYYY-MM-DD")
                      : null;
                  return (
                    <Descriptions.Item key={item.id} label={item.name} span={3}>
                      <DatePicker
                        allowClear={false}
                        value={date ? moment(date) : null}
                        onChange={(date, dateString) =>
                          dataChange(dateString, item.keys, 3)
                        }
                      />
                    </Descriptions.Item>
                  );
                } else if (item.types === "radio") {
                  return (
                    <Descriptions.Item key={item.id} label={item.name} span={3}>
                      <Radio.Group
                        style={{ width: "100%" }}
                        value={
                          data && data[item.keys]
                            ? data[item.keys]
                            : data && data[item.keys] === 0
                            ? data[item.keys]
                            : null
                        }
                        onChange={(e) => dataChange(e, item.keys, 2)}
                      >
                        <Space direction="vertical" style={{ width: "100%" }}>
                          {item.children &&
                          Array.isArray(item.children) &&
                          item.children.length
                            ? item.children.map((item2) => {
                                if (item2.types && item2.children) {
                                  return (
                                    <div
                                      key={item2.id}
                                      style={{ width: "95%", marginTop: 15 }}
                                    >
                                      <Radio key={item2.id} value={item2.value}>
                                        {item2.name}
                                      </Radio>
                                      <TextArea
                                        style={{
                                          width: "150%",
                                          display:
                                            data &&
                                            data[item.keys] &&
                                            data[item.keys] === 6
                                              ? ""
                                              : "none",
                                        }}
                                        value={
                                          data && data[item2.children.keys]
                                            ? data[item2.children.keys]
                                            : data &&
                                              data[item2.children.keys] === 0
                                            ? data[item2.children.keys]
                                            : null
                                        }
                                        onChange={(e) =>
                                          dataChange(e, item2.children.keys, 2)
                                        }
                                      />
                                    </div>
                                  );
                                } else {
                                  return (
                                    <Radio
                                      style={{ marginTop: 15 }}
                                      key={item2.id}
                                      value={item2.value}
                                    >
                                      {item2.name}
                                    </Radio>
                                  );
                                }
                              })
                            : null}
                        </Space>
                      </Radio.Group>
                    </Descriptions.Item>
                  );
                } else if (item.types === "textArea") {
                  return (
                    <Descriptions.Item key={item.id} label={item.name} span={3}>
                      <TextArea value={item.keys} />
                    </Descriptions.Item>
                  );
                }
              })
            : null}
        </Descriptions>
      )}
    </div>
  );
};
