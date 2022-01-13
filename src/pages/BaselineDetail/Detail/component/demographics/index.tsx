import React, { useState, useEffect, useCallback } from "react";
import {
  Descriptions,
  DatePicker,
  Radio,
  Input,
  InputNumber,
  Space,
  Row,
  Col,
  message,
} from "antd";
import moment from "moment";
import "./index.scss";
import { populationDatas, lifeDatas, physiqueDatas, badDatas } from "./datas";
import { KingApi } from "../../../../../request/king";
const { TextArea } = Input;
interface IProps {
  orTab: number;
  patientVisitId: number | null | undefined;
  currentRefresh: () => void;
  preservation: boolean;
  setPreservation: Function;
}
/* 人口学特征----生命体征-----体格检查---合并治疗----不良事件 */
export const Demographics: React.FC<IProps> = (props) => {
  const [orTab, setorTab] = useState<number>(); //传过来的值 1--人口学特征 2----生命体征 3---体格检查 4----合并治疗 5---不良事件
  const [data, setData] = useState<any>({});
  const [orInquiry, setOrInquiry] = useState<boolean>(false); //是否为质询
  const [quickData, setquickData] = useState<any>(); //快捷键数据
  const [sonPatientVisitId, setsonPatientVisitId] = useState<
    number | null | undefined
  >();
  useEffect(() => {
    setorTab(props.orTab);
    if (props.preservation) {
      submit(props.orTab);
    }
    if (props.patientVisitId) {
      if (props.patientVisitId !== sonPatientVisitId || orTab !== props.orTab) {
        setsonPatientVisitId(props.patientVisitId);
        getData(props.orTab);
        if (props.orTab === 4) {
          quick();
        }
      }
    }
    return () => {
      setorTab(0);
      setOrInquiry(false);
    };
  }, [props.orTab, props.preservation, props.patientVisitId]);

  // 查询
  const getData = (orTab: number) => {
    switch (orTab) {
      case 1:
        KingApi.populationApi({ visit_content_id: props.patientVisitId }).then(
          (res) => {
            if (res.success) {
              if (res.data) {
                setData(res.data);
              } else {
                setData({});
              }
            } else {
              message.error(res.error);
            }
          }
        );
        break;
      case 2:
        KingApi.lifeApi({ visit_content_id: props.patientVisitId }).then(
          (res) => {
            if (res.success) {
              if (res.data) {
                setData(res.data);
              } else {
                setData({});
              }
            } else {
              message.error(res.error);
            }
          }
        );
        break;
      case 3:
        KingApi.physiqueApi({ visit_content_id: props.patientVisitId }).then(
          (res) => {
            if (res.success) {
              if (res.data) {
                setData(res.data);
              } else {
                setData({});
              }
            } else {
              message.error(res.error);
            }
          }
        );
        break;
      case 4:
        KingApi.mergeApi({ visit_content_id: props.patientVisitId }).then(
          (res) => {
            if (res.success) {
              if (res.data) {
                setData(res.data);
              } else {
                setData({});
              }
            } else {
              message.error(res.error);
            }
          }
        );
        break;
      case 5:
        KingApi.badApi({ visit_content_id: props.patientVisitId }).then(
          (res) => {
            if (res.success) {
              if (res.data) {
                setData(res.data);
              } else {
                setData({});
              }
            } else {
              message.error(res.error);
            }
          }
        );
        break;
    }
  };
  /* 获取合并治疗快捷选项 */
  const quick = () => {
    KingApi.getDistList({}).then((res) => {
      if (res.success) {
        if (res.data && res.data.config_treatment_plan) {
          setquickData(res.data.config_treatment_plan);
        }
      } else {
        message.error(res.error);
      }
    });
  };
  // 提交
  const submit = (orTab: number) => {
    switch (orTab) {
      case 1:
        KingApi.submitPopulationApi({
          ...data,
          visit_content_id: props.patientVisitId,
        }).then((res) => {
          if (res.success) {
            message.success(res.error);
            props.currentRefresh();
          } else {
            message.error(res.error);
          }
        });
        break;
      case 2:
        KingApi.submitLifeApi({
          ...data,
          visit_content_id: props.patientVisitId,
        }).then((res) => {
          if (res.success) {
            message.success(res.error);
            props.currentRefresh();
          } else {
            message.error(res.error);
          }
        });
        break;
      case 3:
        KingApi.submitPhysiqueApi({
          ...data,
          visit_content_id: props.patientVisitId,
        }).then((res) => {
          if (res.success) {
            message.success(res.error);
            props.currentRefresh();
          } else {
            message.error(res.error);
          }
        });
        break;
      case 4:
        KingApi.submitMergeApi({
          ...data,
          visit_content_id: props.patientVisitId,
        }).then((res) => {
          if (res.success) {
            message.success(res.error);
            props.currentRefresh();
          } else {
            message.error(res.error);
          }
        });
        break;
      case 5:
        KingApi.submitBadApi({
          ...data,
          visit_content_id: props.patientVisitId,
        }).then((res) => {
          if (res.success) {
            message.success(res.error);
            props.currentRefresh();
          } else {
            message.error(res.error);
          }
        });
        break;
    }
    props.setPreservation(false);
  };
  // 修改事件
  const dataChange = (val: any, keys: string, type: number) => {
    const _data: any = { ...data };
    if (type === 1) {
      if(keys==='temperature'){
        if(val>=100){
          return
        }else{
          _data[keys] = val.toFixed(1);
        }
      }else if(keys==='breathe_num'){
        if(val>=100){
          return
        }else{
          _data[keys] = parseInt(val);
        }
      }else if(keys==='heart_rate'||keys==='dbp'||keys==='sbp'){
        if(val>=1000){
          return
        }else{
          _data[keys] = parseInt(val);
        }
      }else{
        _data[keys] = val;
      }
    } else if (type === 2) {
      if(_data.nation_other){
        _data.nation_other=''
      }
      if(_data.drug_allergy_history_specific){
        _data.drug_allergy_history_specific=''
      }
      if(_data.skin_mucosa_abnormal){
        _data.skin_mucosa_abnormal=''
      }
      _data[keys] = val.target.value;
    } else if (type === 3) {
      _data[keys] = moment(val).format("YYYY-MM-DD");
    }

    setData(_data);
  };
  // 基础信息查询
  return (
    <div className="demographics">
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
          ? "人口统计学信息"
          : orTab === 2
          ? "生命体征"
          : orTab === 3
          ? "体格检查"
          : orTab === 4
          ? "合并治疗"
          : orTab === 5
          ? "不良事件"
          : null}
      </button>
      {/* <button
        onClick={() => setOrInquiry(true)}
        style={{
          backgroundColor: orInquiry ? "#fff" : "#fafafa",
          color: orInquiry ? "#1abc9c" : "",
        }}
      >
        质询
      </button> */}
      {orInquiry ? null : (
        <div>
          {orTab === 1 ? (
            <Descriptions
              labelStyle={{ width: "20%" }}
              bordered
              style={{ backgroundColor: "#fff" }}
            >
              {populationDatas &&
              Array.isArray(populationDatas) &&
              populationDatas.length
                ? populationDatas.map((item) => {
                    if (item.types === "date") {
                      let date: any =
                        data && data[item.keys]
                          ? moment(data[item.keys]).format("YYYY-MM-DD")
                          : null;
                      return (
                        <Descriptions.Item
                          key={item.id}
                          label={item.name}
                          span={3}
                        >
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
                        <Descriptions.Item
                          key={item.id}
                          label={item.name}
                          span={3}
                        >
                          <Radio.Group
                            value={
                              data && data[item.keys]
                                ? data[item.keys]
                                : data && data[item.keys] === 0
                                ? data[item.keys]
                                : null
                            }
                            onChange={(e) => dataChange(e, item.keys, 2)}
                          >
                            {item.children &&
                            Array.isArray(item.children) &&
                            item.children.length
                              ? item.children.map((item2) => {
                                  if (item2.types && item2.children) {
                                    if (item.name === "民族：") {
                                      return (
                                        <Radio
                                          key={item2.id}
                                          value={item2.value}
                                        >
                                          {item2.name}
                                          {data &&
                                          data[item.keys] &&
                                          data[item.keys] === 2 ? (
                                            <Input
                                              style={{ width: "200px" }}
                                              value={
                                                data &&
                                                data[item2.children?.keys]
                                              }
                                              onChange={(e) =>
                                                dataChange(
                                                  e,
                                                  item2.children.keys,
                                                  2
                                                )
                                              }
                                            />
                                          ) : null}
                                        </Radio>
                                      );
                                    } else {
                                      return (
                                        <Radio
                                          key={item2.id}
                                          value={item2.value}
                                        >
                                          {item2.name}
                                          {data &&
                                          data[item.keys] &&
                                          data[item.keys] === 1 ? (
                                            <Input
                                              style={{ width: "200px" }}
                                              value={
                                                data &&
                                                data[item2.children?.keys]
                                              }
                                              onChange={(e) =>
                                                dataChange(
                                                  e,
                                                  item2.children.keys,
                                                  2
                                                )
                                              }
                                            />
                                          ) : null}
                                        </Radio>
                                      );
                                    }
                                  } else {
                                    return (
                                      <Radio key={item2.id} value={item2.value}>
                                        {item2.name}
                                      </Radio>
                                    );
                                  }
                                })
                              : null}
                          </Radio.Group>
                        </Descriptions.Item>
                      );
                    } else if (item.types === "textArea") {
                      return (
                        <Descriptions.Item
                          key={item.id}
                          label={item.name}
                          span={3}
                        >
                          <TextArea
                            value={
                              data && data[item.keys] ? data[item.keys] : null
                            }
                            onChange={(e) => dataChange(e, item.keys, 2)}
                          />
                        </Descriptions.Item>
                      );
                    } else if (item.types === "inputNumber") {
                      return (
                        <Descriptions.Item
                          key={item.id}
                          label={item.name}
                          span={3}
                        >
                          {item.name === "身高：" ? (
                            <div>
                              <InputNumber
                                value={
                                  data && data[item.keys]
                                    ? data[item.keys]
                                    : null
                                }
                                onChange={(val) =>
                                  dataChange(val, item.keys, 1)
                                }
                                style={{ width: 200 }}
                              />
                              厘米
                            </div>
                          ) : item.name === "体重：" ? (
                            <div>
                              <InputNumber
                                value={
                                  data && data[item.keys]
                                    ? data[item.keys]
                                    : null
                                }
                                onChange={(val) =>
                                  dataChange(val, item.keys, 1)
                                }
                                style={{ width: 200 }}
                              />
                              公斤
                            </div>
                          ) : (
                            <InputNumber
                              value={
                                data && data[item.keys] ? data[item.keys] : null
                              }
                              onChange={(val) => dataChange(val, item.keys, 1)}
                            />
                          )}
                        </Descriptions.Item>
                      );
                    }
                  })
                : null}
            </Descriptions>
          ) : orTab === 2 ? (
            <Descriptions
              labelStyle={{ width: "20%" }}
              bordered
              style={{ backgroundColor: "#fff" }}
            >
              {lifeDatas && Array.isArray(lifeDatas) && lifeDatas.length
                ? lifeDatas.map((item) => {
                    if (item.types === "inputNumber") {
                      return (
                        <Descriptions.Item
                          key={item.id}
                          label={item.name}
                          span={3}
                        >
                          {item.name === "体温：" ? (
                            <div>
                              <InputNumber
                                min={0}
                                value={
                                  data && data[item.keys]
                                    ? data[item.keys]
                                    : null
                                }
                                onChange={(val) =>
                                  dataChange(val, item.keys, 1)
                                }
                                style={{ width: 200 }}
                              />
                              ℃
                            </div>
                          ) : item.name === "呼吸：" ? (
                            <div>
                              <InputNumber
                                min={0}
                                value={
                                  data && data[item.keys]
                                    ? data[item.keys]
                                    : null
                                }
                                onChange={(val) =>
                                  dataChange(val, item.keys, 1)
                                }
                                style={{ width: 200 }}
                              />
                              次/分
                            </div>
                          ) : item.name === "心率：" ? (
                            <div>
                              <InputNumber
                                min={0}
                                value={
                                  data && data[item.keys]
                                    ? data[item.keys]
                                    : null
                                }
                                onChange={(val) =>
                                  dataChange(val, item.keys, 1)
                                }
                                style={{ width: 200 }}
                              />
                              次/分
                            </div>
                          ) : item.name === "血压：" ? (
                            <div>
                              <InputNumber
                                min={0}
                                value={
                                  data && data[item.keys]
                                    ? data[item.keys]
                                    : null
                                }
                                onChange={(val) =>
                                  dataChange(val, item.keys, 1)
                                }
                                style={{ width: 100 }}
                              />
                              <span style={{ margin: "auto 10px" }}>/</span>
                              <InputNumber
                                min={0}
                                value={data && data.dbp ? data.dbp : null}
                                onChange={(val) => dataChange(val, "dbp", 1)}
                                style={{ width: 100 }}
                              />
                              mmHg
                            </div>
                          ) : (
                            <InputNumber
                              min={0}
                              value={
                                data && data[item.keys] ? data[item.keys] : null
                              }
                              onChange={(val) => dataChange(val, item.keys, 1)}
                            />
                          )}
                        </Descriptions.Item>
                      );
                    }
                  })
                : null}
            </Descriptions>
          ) : orTab === 3 ? (
            <Descriptions
              labelStyle={{ width: "20%" }}
              bordered
              style={{ backgroundColor: "#fff" }}
            >
              {physiqueDatas &&
              Array.isArray(physiqueDatas) &&
              physiqueDatas.length
                ? physiqueDatas.map((item) => {
                    if (item.types === "radio") {
                      return (
                        <Descriptions.Item
                          key={item.id}
                          label={item.name}
                          span={3}
                        >
                          <Radio.Group
                            value={
                              data && data[item.keys] ? data[item.keys] : null
                            }
                            onChange={(e) => dataChange(e, item.keys, 2)}
                          >
                            <Space direction="vertical">
                              {item.children &&
                              Array.isArray(item.children) &&
                              item.children.length
                                ? item.children.map((item2) => {
                                    if (item2.types && item2.children) {
                                      return (
                                        <Radio
                                          key={item2.id}
                                          value={item2.value}
                                        >
                                          {item2.name}
                                          {data &&
                                          data[item.keys] &&
                                          data[item.keys] === 2 ? (
                                            <Input
                                              style={{ width: "300px" }}
                                              onChange={(e) =>
                                                dataChange(
                                                  e,
                                                  item2.children.keys,
                                                  2
                                                )
                                              }
                                              value={
                                                data &&
                                                data[item2.children?.keys]
                                                  ? data[item2.children?.keys]
                                                  : null
                                              }
                                            />
                                          ) : null}
                                        </Radio>
                                      );
                                    } else {
                                      return (
                                        <Radio
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
                    }
                  })
                : null}
            </Descriptions>
          ) : orTab === 4 ? (
            <Row style={{ backgroundColor: "#fff", minHeight: 350 }}>
              <Col span={4}>
                <span style={{ float: "right" }}>本次治疗方案：</span>
              </Col>
              <Col span={16}>
                <TextArea
                  rows={12}
                  value={data && data.content ? data.content : null}
                  onChange={(e) => dataChange(e, "content", 2)}
                />
                {quickData && Array.isArray(quickData) && quickData.length
                  ? quickData.map((item, index) => {
                      return (
                        <button
                          onClick={() => dataChange(item.text, "content", 1)}
                          key={item.id}
                          style={{
                            backgroundColor: "#fff",
                            width: 100,
                            height: 35,
                            marginTop: 20,
                            marginRight: 20,
                            border: "1px solid #797979",
                          }}
                        >
                          快捷选项名{index + 1}
                        </button>
                      );
                    })
                  : null}
              </Col>
              <Col span={4}></Col>
            </Row>
          ) : orTab === 5 ? (
            <Descriptions
              labelStyle={{ width: "20%" }}
              bordered
              style={{ backgroundColor: "#fff" }}
            >
              {badDatas && Array.isArray(badDatas) && badDatas.length
                ? badDatas.map((item) => {
                    if (item.types === "date") {
                      let date: any =
                        data && data[item.keys]
                          ? moment(data[item.keys]).format("YYYY-MM-DD")
                          : null;
                      return (
                        <Descriptions.Item
                          key={item.id}
                          label={item.name}
                          span={3}
                        >
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
                        <Descriptions.Item
                          key={item.id}
                          label={item.name}
                          span={3}
                        >
                          {item.transverse ? (
                            <Radio.Group
                              value={
                                data && data[item.keys]
                                  ? data[item.keys]
                                  : data && data[item.keys] === 0
                                  ? data[item.keys]
                                  : null
                              }
                              onChange={(e) => dataChange(e, item.keys, 2)}
                            >
                              {item.children &&
                              Array.isArray(item.children) &&
                              item.children.length
                                ? item.children.map((item2) => {
                                    return (
                                      <Radio key={item2.id} value={item2.value}>
                                        {item2.name}
                                      </Radio>
                                    );
                                  })
                                : null}
                            </Radio.Group>
                          ) : (
                            <Radio.Group
                              value={
                                data && data[item.keys]
                                  ? data[item.keys]
                                  : data && data[item.keys] === 0
                                  ? data[item.keys]
                                  : null
                              }
                              onChange={(e) => dataChange(e, item.keys, 2)}
                            >
                              <Space direction="vertical">
                                {item.children &&
                                Array.isArray(item.children) &&
                                item.children.length
                                  ? item.children.map((item2) => {
                                      return (
                                        <Radio
                                          key={item2.id}
                                          value={item2.value}
                                        >
                                          {item2.name}
                                        </Radio>
                                      );
                                    })
                                  : null}
                              </Space>
                            </Radio.Group>
                          )}
                        </Descriptions.Item>
                      );
                    } else if (item.types === "textArea") {
                      return (
                        <Descriptions.Item
                          key={item.id}
                          label={item.name}
                          span={3}
                        >
                          <TextArea
                            value={
                              data && data[item.keys] ? data[item.keys] : null
                            }
                            onChange={(e) => dataChange(e, item.keys, 2)}
                          />
                        </Descriptions.Item>
                      );
                    } else if (item.types === "input") {
                      return (
                        <Descriptions.Item
                          key={item.id}
                          label={item.name}
                          span={3}
                        >
                          <Input
                            value={
                              data && data[item.keys] ? data[item.keys] : null
                            }
                            onChange={(e) => dataChange(e, item.keys, 2)}
                          />
                        </Descriptions.Item>
                      );
                    }
                  })
                : null}
            </Descriptions>
          ) : null}
        </div>
      )}
    </div>
  );
};
