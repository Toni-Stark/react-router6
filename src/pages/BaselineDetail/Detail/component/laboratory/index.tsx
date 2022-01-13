import React, { useState, useEffect } from "react";
import { DatePicker, Radio, Input, InputNumber, message, Row, Col } from "antd";
import moment from "moment";
import { KingApi } from "../../../../../request/king";
import "./index.scss";
import { bloodDatas, urineDatas, biochemistryDatas } from "./datas";
interface IProps {
  orTab: number;
  patientVisitId: number | null | undefined;
  currentRefresh: () => void;
  preservation: boolean;
  setPreservation: Function;
}
/* 实验室检验 */
/* 血常规数据 */
const blood = [
  {
    name_code: "RBC",
    name: "红细胞",
    result: null,
    sense_id: null,
  },
  {
    name_code: "HGB",
    name: "血红蛋白",
    result: null,
    sense_id: null,
  },
  {
    name_code: "WBC",
    name: "白细胞",
    result: null,
    sense_id: null,
  },
  {
    name_code: "PLT",
    name: "血小板",
    result: null,
    sense_id: null,
  },
  {
    name_code: "HCT",
    name: "HCT",
    result: null,
    sense_id: null,
  },
];
/* 尿常规数据 */
const urine = [
  {
    name_code: "WBC-F",
    name: "尿白细胞",
    result: null,
    sense_id: null,
  },
  {
    name_code: "RBC-F",
    name: "尿红细胞",
    result: null,
    sense_id: null,
  },
  {
    name_code: "NNADL",
    name: "24小时尿蛋白",
    result: null,
    sense_id: null,
  },
];
/* 血液生化检查 */
const biochemistry = [
  {
    name_code: "ALT",
    name: "ALT",
    result: null,
    sense_id: null,
  },
  {
    name_code: "AST",
    name: "AST",
    result: null,
    sense_id: null,
  },
  {
    name_code: "TBil",
    name: "TBil",
    result: null,
    sense_id: null,
  },
  {
    name_code: "BUN",
    name: "BUN",
    result: null,
    sense_id: null,
  },
  {
    name_code: "CREA",
    name: "血清肌酐sCr",
    result: null,
    sense_id: null,
  },
  {
    name_code: "ALB",
    name: "血浆白蛋白",
    result: null,
    sense_id: null,
  },
  {
    name_code: "ALB/GLB",
    name: "血浆球蛋白",
    result: null,
    sense_id: null,
  },
  {
    name_code: "UA",
    name: "尿酸",
    result: null,
    sense_id: null,
  },
  {
    name_code: "TG",
    name: "甘油三酯",
    result: null,
    sense_id: null,
  },
  {
    name_code: "TCH",
    name: "胆固醇",
    result: null,
    sense_id: null,
  },
];
export const Laboratory: React.FC<IProps> = (props) => {
  const [orTab, setorTab] = useState<number>(); //传过来的值 1--血常规 2----尿常规 3---血液生化检查
  const [startDate, setStartDate] = useState<string | null | undefined>();
  const [startDateType, setStartDateType] = useState<any>();
  const [data, setData] = useState<any>([]);
  const [orInquiry, setOrInquiry] = useState<boolean>(false); //是否为质询
  const [sonPatientVisitId, setsonPatientVisitId] = useState<
    number | null | undefined
  >();
  useEffect(() => {
    setStartDateType(startDate ? moment(startDate).format("YYYY-MM-DD") : null);
  }, [startDate]);
  useEffect(() => {
    setorTab(props.orTab);
    if (props.preservation) {
      submit(props.orTab);
    }
    if (props.patientVisitId) {
      if (props.patientVisitId !== sonPatientVisitId || orTab !== props.orTab) {
        setsonPatientVisitId(props.patientVisitId);
        getData(props.orTab);
      }
    }
    return () => {
      setorTab(0);
      setOrInquiry(false);
    };
  }, [props.orTab, props.preservation, props.patientVisitId]);
  // 查询
  const getData = (orTab: number) => {
    KingApi.laboratoryApi({ visit_content_id: props.patientVisitId }).then(
      (res) => {
        if (res.success) {
          if (res.data && res.data.report_date) {
            setStartDate(res.data.report_date);
          }
          if (
            res.data &&
            res.data.lis_result &&
            Array.isArray(res.data.lis_result) &&
            res.data.lis_result.length
          ) {
            setData(res.data.lis_result);
          } else {
            setStartDate(null);
            synchronization()
          }
        } else {
          message.error(res.error);
        }
      }
    );
  };
  /* 同步 */
  const synchronization = () => {
    KingApi.laboratorySynchronizationApi({
      visit_content_id: props.patientVisitId,
    }).then((res) => {
      if (res.success) {
        if (res.data && res.data.report_date) {
          setStartDate(res.data.report_date);
        }
        if (
          res.data &&
          res.data.lis_result &&
          Array.isArray(res.data.lis_result) &&
          res.data.lis_result.length
        ) {
          setData(res.data.lis_result);
        } else {
          setStartDate(null);
          if (orTab === 1) {
            setData(JSON.parse(JSON.stringify(blood)));
          } else if (orTab === 2) {
            setData(JSON.parse(JSON.stringify(urine)));
          } else if (orTab === 3) {
            setData(JSON.parse(JSON.stringify(biochemistry)));
          }
        }
        message.success("同步成功");
      } else {
        message.error(res.error);
      }
    });
  };
  // 提交
  const submit = (orTab: number) => {
    KingApi.submitLaboratoryApi({
      visit_content_id: props.patientVisitId,
      lis_result: data,
      report_date: startDate,
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
  const dataChange = (val: any, keys: number, type: number) => {
    const _data = [...data];
    if (type === 1) {
      _data[keys].result = val.target.value;
    } else if (type === 2) {
      _data[keys].sense_id = val.target.value;
    }
    setData(_data);
  };
  // 基础信息查询
  return (
    <div className="laboratory">
      <button
        onClick={() => setOrInquiry(false)}
        style={{
          backgroundColor: orInquiry ? "#fafafa" : "#fff",
          color: orInquiry ? "" : "#1abc9c",
          marginBottom: 3,
          marginRight: 3,
        }}
      >
        {orTab === 1
          ? "血常规"
          : orTab === 2
          ? "尿常规"
          : orTab === 3
          ? "血液生化检查"
          : null}
      </button>
      {/* <button onClick={()=>setOrInquiry(true)} style={{
        backgroundColor:orInquiry?'#fff':'#fafafa',
        color:orInquiry?'#1abc9c':'',
      }}>质询</button> */}
      <button
        onClick={synchronization}
        style={{
          float: "right",
          backgroundColor: "#1abc9c",
          color: "#fff",
        }}
      >
        手工同步
      </button>
      {orInquiry ? null : (
        <div style={{ backgroundColor: "#fff", paddingTop: 50 }}>
          {orTab === 1 ? (
            <div>
              {bloodDatas && Array.isArray(bloodDatas) && bloodDatas.length
                ? bloodDatas.map((item, index) => {
                    if (item.isTitle) {
                      return (
                        <Row className="Row" key={item.id}>
                          <Col className="tableTd" span={4}>
                            {item.name}
                          </Col>
                          <Col className="tableTd" span={4}>
                            {item.name1}
                          </Col>
                          <Col className="tableTd" span={16}>
                            {item.name2}
                          </Col>
                        </Row>
                      );
                    } else {
                      return (
                        <Row className="Row" key={item.id}>
                          <Col className="tableTd" span={4}>
                            {item.name}
                          </Col>
                          <Col className="tableTd" span={4}>
                            {item.name1 === "date" ? (
                              <DatePicker
                                allowClear={false}
                                value={
                                  startDateType ? moment(startDateType) : null
                                }
                                onChange={(date, dateString) =>
                                  setStartDate(dateString)
                                }
                              />
                            ) : item.name1 === "radio" ? (
                              <Radio.Group
                                value={
                                  data && data[index - 2]
                                    ? data[index - 2].sense_id
                                    : null
                                }
                                onChange={(e) => {
                                  dataChange(e, index - 2, 2);
                                }}
                              >
                                {item.children &&
                                Array.isArray(item.children) &&
                                item.children.length
                                  ? item.children.map((item2, index) => {
                                      return (
                                        <Radio key={index} value={item2.value}>
                                          {item2.name}
                                        </Radio>
                                      );
                                    })
                                  : null}
                              </Radio.Group>
                            ) : item.name1 === "input" ? (
                              <Input
                                style={{ width: "80%" }}
                                value={
                                  data && data[index - 2]
                                    ? data[index - 2].result
                                    : null
                                }
                                onChange={(val) => {
                                  dataChange(val, index - 2, 1);
                                }}
                              />
                            ) : null}
                          </Col>
                          <Col className="tableTd" span={16}>
                            {item.name2 === "date" ? (
                              <DatePicker
                                allowClear={false}
                                value={
                                  startDateType ? moment(startDateType) : null
                                }
                                onChange={(date, dateString) =>
                                  setStartDate(dateString)
                                }
                              />
                            ) : item.name2 === "radio" ? (
                              <Radio.Group
                                value={
                                  data && data[index - 2]
                                    ? data[index - 2].sense_id
                                    : null
                                }
                                onChange={(e) => {
                                  dataChange(e, index - 2, 2);
                                }}
                              >
                                {item.children &&
                                Array.isArray(item.children) &&
                                item.children.length
                                  ? item.children.map((item2, index) => {
                                      return (
                                        <Radio key={index} value={item2.value}>
                                          {item2.name}
                                        </Radio>
                                      );
                                    })
                                  : null}
                              </Radio.Group>
                            ) : null}
                          </Col>
                        </Row>
                      );
                    }
                  })
                : null}
            </div>
          ) : orTab === 2 ? (
            <div>
              {urineDatas && Array.isArray(urineDatas) && urineDatas.length
                ? urineDatas.map((item, index) => {
                    if (item.isTitle) {
                      return (
                        <Row className="Row" key={item.id}>
                          <Col className="tableTd" span={4}>
                            {item.name}
                          </Col>
                          <Col className="tableTd" span={4}>
                            {item.name1}
                          </Col>
                          <Col className="tableTd" span={16}>
                            {item.name2}
                          </Col>
                        </Row>
                      );
                    } else {
                      return (
                        <Row className="Row" key={item.id}>
                          <Col className="tableTd" span={4}>
                            {item.name}
                          </Col>
                          <Col className="tableTd" span={4}>
                            {item.name1 === "date" ? (
                              <DatePicker
                                allowClear={false}
                                value={
                                  startDateType ? moment(startDateType) : null
                                }
                                onChange={(date, dateString) =>
                                  setStartDate(dateString)
                                }
                              />
                            ) : item.name1 === "radio" ? (
                              <Radio.Group
                                value={
                                  data && data[index - 2]
                                    ? data[index - 2].sense_id
                                    : null
                                }
                                onChange={(e) => {
                                  dataChange(e, index - 2, 2);
                                }}
                              >
                                {item.children &&
                                Array.isArray(item.children) &&
                                item.children.length
                                  ? item.children.map((item2, index) => {
                                      return (
                                        <Radio key={index} value={item2.value}>
                                          {item2.name}
                                        </Radio>
                                      );
                                    })
                                  : null}
                              </Radio.Group>
                            ) : item.name1 === "input" ? (
                              <Input
                                style={{ width: "80%" }}
                                value={
                                  data && data[index - 2]
                                    ? data[index - 2].result
                                    : null
                                }
                                onChange={(val) => {
                                  dataChange(val, index - 2, 1);
                                }}
                              />
                            ) : null}
                          </Col>
                          <Col className="tableTd" span={16}>
                            {item.name2 === "date" ? (
                              <DatePicker
                                allowClear={false}
                                value={
                                  startDateType ? moment(startDateType) : null
                                }
                                onChange={(date, dateString) =>
                                  setStartDate(dateString)
                                }
                              />
                            ) : item.name2 === "radio" ? (
                              <Radio.Group
                                value={
                                  data && data[index - 2]
                                    ? data[index - 2].sense_id
                                    : null
                                }
                                onChange={(e) => {
                                  dataChange(e, index - 2, 2);
                                }}
                              >
                                {item.children &&
                                Array.isArray(item.children) &&
                                item.children.length
                                  ? item.children.map((item2, index) => {
                                      return (
                                        <Radio key={index} value={item2.value}>
                                          {item2.name}
                                        </Radio>
                                      );
                                    })
                                  : null}
                              </Radio.Group>
                            ) : null}
                          </Col>
                        </Row>
                      );
                    }
                  })
                : null}
            </div>
          ) : orTab === 3 ? (
            <div>
              {biochemistryDatas &&
              Array.isArray(biochemistryDatas) &&
              biochemistryDatas.length
                ? biochemistryDatas.map((item, index) => {
                    if (item.isTitle) {
                      return (
                        <Row className="Row" key={item.id}>
                          <Col className="tableTd" span={4}>
                            {item.name}
                          </Col>
                          <Col className="tableTd" span={4}>
                            {item.name1}
                          </Col>
                          <Col className="tableTd" span={16}>
                            {item.name2}
                          </Col>
                        </Row>
                      );
                    } else {
                      return (
                        <Row className="Row" key={item.id}>
                          <Col className="tableTd" span={4}>
                            {item.name}
                          </Col>
                          <Col className="tableTd" span={4}>
                            {item.name1 === "date" ? (
                              <DatePicker
                                allowClear={false}
                                value={
                                  startDateType ? moment(startDateType) : null
                                }
                                onChange={(date, dateString) =>
                                  setStartDate(dateString)
                                }
                              />
                            ) : item.name1 === "radio" ? (
                              <Radio.Group
                                value={
                                  data && data[index - 2]
                                    ? data[index - 2].sense_id
                                    : null
                                }
                                onChange={(e) => {
                                  dataChange(e, index - 2, 2);
                                }}
                              >
                                {item.children &&
                                Array.isArray(item.children) &&
                                item.children.length
                                  ? item.children.map((item2, index) => {
                                      return (
                                        <Radio key={index} value={item2.value}>
                                          {item2.name}
                                        </Radio>
                                      );
                                    })
                                  : null}
                              </Radio.Group>
                            ) : item.name1 === "input" ? (
                              <Input
                                style={{ width: "80%" }}
                                value={
                                  data && data[index - 2]
                                    ? data[index - 2].result
                                    : null
                                }
                                onChange={(val) => {
                                  dataChange(val, index - 2, 1);
                                }}
                              />
                            ) : null}
                          </Col>
                          <Col className="tableTd" span={16}>
                            {item.name2 === "date" ? (
                              <DatePicker
                                allowClear={false}
                                value={
                                  startDateType ? moment(startDateType) : null
                                }
                                onChange={(date, dateString) =>
                                  setStartDate(dateString)
                                }
                              />
                            ) : item.name2 === "radio" ? (
                              <Radio.Group
                                value={
                                  data && data[index - 2]
                                    ? data[index - 2].sense_id
                                    : null
                                }
                                onChange={(e) => {
                                  dataChange(e, index - 2, 2);
                                }}
                              >
                                {item.children &&
                                Array.isArray(item.children) &&
                                item.children.length
                                  ? item.children.map((item2, index) => {
                                      return (
                                        <Radio key={index} value={item2.value}>
                                          {item2.name}
                                        </Radio>
                                      );
                                    })
                                  : null}
                              </Radio.Group>
                            ) : null}
                          </Col>
                        </Row>
                      );
                    }
                  })
                : null}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
