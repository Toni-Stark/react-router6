import React, { useState, useEffect } from "react";
import {
  Select,
  DatePicker,
  Radio,
  Input,
  Table,
  Checkbox,
  message,
} from "antd";
import moment from "moment";
import { KingApi } from "../../../../../request/king";
import "./index.scss";
interface IProps {
  orTab: number;
  patientVisitId: number | null | undefined;
  preservation: boolean;
  currentRefresh: () => void;
  setPreservation: Function;
}
interface selectType {
  id: number;
  name: string;
}
const { Option } = Select;
/* 治疗---用药 */
const treatment = [
  { is_continue: 0 },
  { is_continue: 0 },
  { is_continue: 0 },
  { is_continue: 0 },
  { is_continue: 0 },
];
/* 疾病 */
const disease = [{}, {}, {}, {}, {}];
const diseaseOperation = [{}, {}];
/* 疾病史---治疗史---用药 */
export const MedicalHistory: React.FC<IProps> = (props) => {
  const [orTab, setorTab] = useState<number>(); //传过来的值 1--疾病史 2----治疗史 3---用药
  const [orInquiry, setOrInquiry] = useState<boolean>(false); //是否为质询
  const [dataSource, setDataSource] = useState<any>(); //数据
  const [radioSelect, setradioSelect] = useState<string | number | null>(); //有无选项
  const [dataSource1, setDataSource1] = useState<any>([{}, {}, {}, {}, {}]); //疾病史---手术
  const [radioSelect1, setradioSelect1] = useState<string | number | null>(); //疾病史---手术---有无选项
  const [selectData, setSelectData] = useState<any>(); //下拉数据
  const [sonPatientVisitId, setsonPatientVisitId] = useState<number | null | undefined>();
  useEffect(() => {
    setorTab(props.orTab);
    if (props.preservation) {
      submit(props.orTab);
    }
    if (props.patientVisitId) {
      if (props.patientVisitId !== sonPatientVisitId || orTab !== props.orTab) {
        setsonPatientVisitId(props.patientVisitId);
        getData(props.orTab);
        quick();
      }
    }
    return () => {
      setorTab(0);
      setOrInquiry(false);
    };
  }, [props.orTab, props.preservation, props.patientVisitId])
  useEffect(()=>{
    if(radioSelect===0){
      if(orTab===2 || orTab===3){
        setDataSource(JSON.parse(JSON.stringify(treatment)));
      }else{
        setDataSource(JSON.parse(JSON.stringify(disease)));
      }
    }
    if(radioSelect1===0){
      setDataSource1(JSON.parse(JSON.stringify(diseaseOperation)));
    }
  },[radioSelect,radioSelect1])
  // 查询
  const getData = (orTab: number) => {
    switch (orTab) {
      case 1:
        KingApi.diseaseApi({ visit_content_id: props.patientVisitId }).then(
          (res) => {
            if (res.success) {
              if (res.data) {
                setradioSelect(res.data.past_disease_history);
                setradioSelect1(res.data.surgical_operation_history);
                if (
                  res.data.sr_disease_past_history &&
                  Array.isArray(res.data.sr_disease_past_history) &&
                  res.data.sr_disease_past_history.length
                ) {
                  if (res.data.sr_disease_past_history.length >= 5) {
                    setDataSource(res.data.sr_disease_past_history);
                  } else {
                    let _data: any = [];
                    JSON.parse(JSON.stringify(disease)).map((item: any, index: number) => {
                      if (res.data.sr_disease_past_history[index]) {
                        _data.push(res.data.sr_disease_past_history[index]);
                      } else {
                        _data.push(item);
                      }
                    });
                    setDataSource(_data);
                  }
                } else {
                  setDataSource(JSON.parse(JSON.stringify(disease)));
                }
                if (
                  res.data.sr_disease_operation_history &&
                  Array.isArray(res.data.sr_disease_operation_history) &&
                  res.data.sr_disease_operation_history.length
                ) {
                  if (res.data.sr_disease_operation_history.length >= 2) {
                    setDataSource1(res.data.sr_disease_operation_history);
                  } else {
                    let _data: any = [];
                    JSON.parse(JSON.stringify(diseaseOperation)).map((item: any, index: number) => {
                      if (res.data.sr_disease_operation_history[index]) {
                        _data.push(
                          res.data.sr_disease_operation_history[index]
                        );
                      } else {
                        _data.push(item);
                      }
                    });
                    setDataSource1(_data);
                  }
                } else {
                  setDataSource1(JSON.parse(JSON.stringify(diseaseOperation)));
                }
              } else {
                setDataSource(JSON.parse(JSON.stringify(disease)));
                setDataSource1(JSON.parse(JSON.stringify(diseaseOperation)));
                setradioSelect(1);
                setradioSelect1(1);
              }
            } else {
              message.error(res.error);
            }
          }
        );
        break;
      case 2:
        KingApi.treatmentApi({ visit_content_id: props.patientVisitId }).then(
          (res) => {
            if (res.success) {
              if (res.data) {
                setradioSelect(res.data.lga_history);
                if (
                  res.data.sr_treat_history_medical &&
                  Array.isArray(res.data.sr_treat_history_medical) &&
                  res.data.sr_treat_history_medical.length
                ) {
                  if (res.data.sr_treat_history_medical.length >= 5) {
                    setDataSource(res.data.sr_treat_history_medical);
                  } else {
                    let _data: any = [];
                    JSON.parse(JSON.stringify(treatment)).map((item: any, index: number) => {
                      if (res.data.sr_treat_history_medical[index]) {
                        _data.push(res.data.sr_treat_history_medical[index]);
                      } else {
                        _data.push(item);
                      }
                    });
                    setDataSource(_data);
                  }
                } else {
                  setDataSource(JSON.parse(JSON.stringify(treatment)));
                }
              } else {
                setDataSource(JSON.parse(JSON.stringify(treatment)));
                setradioSelect(1);
              }
            } else {
              message.error(res.error);
            }
          }
        );
        break;
      case 3:
        KingApi.medicationApi({ visit_content_id: props.patientVisitId }).then(
          (res) => {
            if (res.success) {
              if (res.data) {
                setradioSelect(res.data.is_use);
                if (
                  res.data.sr_medical_history_result &&
                  Array.isArray(res.data.sr_medical_history_result) &&
                  res.data.sr_medical_history_result.length
                ) {
                  if (res.data.sr_medical_history_result.length >= 5) {
                    setDataSource(res.data.sr_medical_history_result);
                  } else {
                    let _data: any = [];
                    JSON.parse(JSON.stringify(treatment)).map((item: any, index: number) => {
                      if (res.data.sr_medical_history_result[index]) {
                        _data.push(res.data.sr_medical_history_result[index]);
                      } else {
                        _data.push(item);
                      }
                    });
                    setDataSource(_data);
                  }
                } else {
                  setDataSource(JSON.parse(JSON.stringify(treatment)));
                }
              } else {
                setDataSource(JSON.parse(JSON.stringify(treatment)));
                setradioSelect(1);
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
        if (res.data) {
          setSelectData(res.data);
        }
      } else {
        message.error(res.error);
      }
    });
  };
  // 提交
  const submit = (orTab: number) => {
    let _data: any = [];
    dataSource.map((item: any) => {
      if (orTab === 1) {
        if (Object.keys(item).length) {
          _data.push(item);
        } else {
          return true;
        }
      } else {
        if (Object.keys(item).length && Object.keys(item).length !== 1) {
          _data.push(item);
        } else {
          return true;
        }
      }
    });
    let _data1: any = [];
    dataSource1.map((item: any) => {
      if (Object.keys(item).length) {
        _data1.push(item);
      } else {
        return true;
      }
    });
    switch (orTab) {
      case 1:
        let isReturn1 = false;
        _data.map((item: any, index: number) => {
          if (Object.keys(item).length < 4) {
            isReturn1 = true;
            return true;
          } else if (Object.keys(item).length === 4) {
            Object.keys(item).map((item2) => {
              if (_data[index][item2]) {
                return true;
              } else if (
                item2 === "is_affect_lga" &&
                _data[index][item2] === 0
              ) {
                return true;
              } else {
                isReturn1 = true;
                return true;
              }
            });
            return true;
          } else {
            return true;
          }
        });
        _data1.map((item: any, index: number) => {
          if (Object.keys(item).length < 2) {
            isReturn1 = true;
            return true;
          } else if (Object.keys(item).length === 2) {
            Object.keys(item).map((item2) => {
              if (_data1[index][item2] || _data1[index][item2] === 0) {
                return true;
              } else {
                isReturn1 = true;
                return true;
              }
            });
            return true;
          } else {
            return true;
          }
        });
        if (isReturn1) {
          message.warning("请填写完整");
          return props.setPreservation(false);
        } else {
          KingApi.submitDiseaseApi({
            disease: _data,
            operation: _data1,
            visit_content_id: props.patientVisitId,
            past_disease_history: radioSelect,
            surgical_operation_history: radioSelect1,
          }).then((res) => {
            if (res.success) {
              message.success(res.error);
              props.currentRefresh();
            } else {
              message.error(res.error);
            }
          });
        }
        break;
      case 2:
        let isReturn2 = false;
        _data.map((item: any, index: number) => {
          if (Object.keys(item).length < 5) {
            isReturn2 = true;
            return true;
          } else if (Object.keys(item).length === 5) {
            Object.keys(item).map((item2) => {
              if (_data[index][item2]) {
                return true;
              } else if (item2 === "is_continue") {
                return true;
              } else {
                isReturn2 = true;
                return true;
              }
            });
            return true;
          } else {
            return true;
          }
        });
        if (isReturn2) {
          message.warning("请填写完整");
          return props.setPreservation(false);
        } else {
          KingApi.submitTreatmentApi({
            date: _data,
            visit_content_id: props.patientVisitId,
            lga_history: radioSelect,
          }).then((res) => {
            if (res.success) {
              message.success(res.error);
              props.currentRefresh();
            } else {
              message.error(res.error);
            }
          });
        }
        break;
      case 3:
        let isReturn3 = false;
        _data.map((item: any, index: number) => {
          if (Object.keys(item).length < 6) {
            isReturn3 = true;
            return true;
          } else if (Object.keys(item).length === 6) {
            Object.keys(item).map((item2) => {
              if (item2 === "medical") {
                if (
                  selectData.config_medicine &&
                  selectData.config_medicine.find(
                    (item3: any) => item3.name === item[item2]
                  )
                ) {
                  item.medical_id = selectData.config_medicine.find(
                    (item3: any) => item3.name === item[item2]
                  ).id;
                }
              }
              if (_data[index][item2]) {
                return true;
              } else if (item2 === "is_continue") {
                return true;
              } else {
                isReturn3 = true;
                return true;
              }
            });
            return true;
          } else {
            return true;
          }
        });
        if (isReturn3) {
          message.warning("请填写完整");
          return props.setPreservation(false);
        } else {
          KingApi.submitMedicationApi({
            medicine: _data,
            visit_content_id: props.patientVisitId,
            is_use: radioSelect,
          }).then((res) => {
            if (res.success) {
              message.success(res.error);
              props.currentRefresh();
            } else {
              message.error(res.error);
            }
          });
        }
        break;
    }
    props.setPreservation(false);
  };
  // 修改事件
  const dataChange = (val: any, index: number, keys: string, type: number) => {
    const _data: any = [...dataSource];
    if (type === 1) {
      _data[index][keys] = val;
    } else if (type === 2) {
      if (keys === "is_continue") {
        _data[index][keys] = val.target.checked ? 1 : 0;
      } else {
        _data[index][keys] = val.target.value;
      }
    } else if (type === 3) {
      _data[index][keys] = moment(val).format("YYYY-MM-DD");
    }
    setDataSource(_data);
  };
  // 修改事件---疾病史---手术史
  const dataChange1 = (val: any, index: number, keys: string, type: number) => {
    const _data: any = [...dataSource1];
    if (type === 1) {
      _data[index][keys] = val;
    } else if (type === 2) {
      if (keys === "is_continue") {
        _data[index][keys] = val.target.checked ? 1 : 0;
      } else {
        _data[index][keys] = val.target.value;
      }
    } else if (type === 3) {
      _data[index][keys] = moment(val).format("YYYY-MM-DD");
    }
    setDataSource1(_data);
  };
  /* 添加操作 */
  const addFunction = (data: any, setData: Function, index: number) => {
    const _data = [...data];
    _data.splice(index + 1, 0, orTab === 1 ? {} : {is_continue: 0});
    setData(_data);
  };
  /* 删除操作 */
  const delFunction = (data: any, setData: Function, index: number) => {
    if(data===dataSource1){
      if(data.length<=2){
        message.warning('数据至少需要两条，无法删除')
        return 
      }
    }else{
      if(data.length<=5){
        message.warning('数据至少需要五条，无法删除')
        return 
      }
    }
    const _data = [...data];
    _data.splice(index, 1);
    setData(_data);
    
  };
  /* 既往疾病史 */
  const columns: any = [
    {
      title: "诊断名",
      dataIndex: "diagnosis_name",
      render: (val: number | string, row: object, index: number) => (
        <Select
          style={{ width: "100%" }}
          placeholder="请选择诊断名"
          value={val}
          onChange={(val) => {
            dataChange(val, index, "diagnosis_name", 1);
          }}
        >
          {selectData &&
          selectData.config_diagnosis &&
          Array.isArray(selectData.config_diagnosis) &&
          selectData.config_diagnosis.length
            ? selectData.config_diagnosis.map((item: selectType) => {
                return (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                );
              })
            : null}
        </Select>
      ),
    },
    {
      title: "开始日期（年/月/日）",
      dataIndex: "start_date",
      render: (val: number | string, row: object, index: number) => {
        let date: any = val ? moment(val).format("YYYY-MM-DD") : null;
        return (
          <DatePicker
            allowClear={false}
            value={date ? moment(date) : null}
            onChange={(e) => {
              dataChange(e, index, "start_date", 3);
            }}
            placeholder="请选择开始日期"
            style={{ width: "100%" }}
          />
        );
      },
    },
    {
      title: "结束日期（年/月/日）",
      dataIndex: "end_date",
      render: (val: number | string, row: object, index: number) => {
        let date: any = val ? moment(val).format("YYYY-MM-DD") : null;
        return (
          <DatePicker
            allowClear={false}
            value={date ? moment(date) : null}
            onChange={(e) => {
              dataChange(e, index, "end_date", 3);
            }}
            placeholder="请选择开始日期"
            style={{ width: "100%" }}
          />
        );
      },
    },
    {
      title: "对IgA肾病治疗的影响",
      dataIndex: "is_affect_lga",
      render: (val: number | string, row: object, index: number) => (
        <Radio.Group
          value={val}
          onChange={(val) => {
            dataChange(val, index, "is_affect_lga", 2);
          }}
        >
          <Radio value={1}>有</Radio>
          <Radio value={0}>无</Radio>
        </Radio.Group>
      ),
    },
    {
      title: "操作",
      dataIndex: "address",
      width: 240,
      render: (val: string, row: object, index: number) => (
        <div>
          <button
            style={{
              width: 80,
              height: 30,
              textAlign: "center",
              border: "none",
              color: "#fff",
              backgroundColor: "#42b8a3",
            }}
            onClick={() => addFunction(dataSource, setDataSource, index)}
          >
            添加
          </button>
          <button
            style={{
              width: 80,
              height: 30,
              textAlign: "center",
              border: "none",
              color: "#fff",
              backgroundColor: "#e6596b",
              marginLeft: 10,
            }}
            onClick={() => delFunction(dataSource, setDataSource, index)}
          >
            删除
          </button>
        </div>
      ),
    },
  ];
  /* 手术史 */
  const columns1: any = [
    {
      title: "手术（操作）史名称",
      dataIndex: "operation_name",
      render: (val: string, row: object, index: number) => {
        return (
          <Input
            value={val ? val : ''}
            onChange={(e) => {
              dataChange1(e, index, "operation_name", 2);
            }}
            placeholder="手术（操作）史名称"
            style={{ width: "100%" }}
          />
        );
      },
    },
    {
      title: "手术（操作）（年/月）",
      dataIndex: "operation_date",
      render: (val: number | string, row: object, index: number) => {
        let date: any = val ? moment(val).format("YYYY-MM-DD") : null;
        return (
          <DatePicker
            allowClear={false}
            value={date ? moment(date) : null}
            onChange={(e) => {
              dataChange1(e, index, "operation_date", 3);
            }}
            placeholder="请选择手术（操作）时间"
            style={{ width: "100%" }}
          />
        );
      },
    },
    {
      title: "操作",
      dataIndex: "address",
      width: 240,
      render: (val: string, row: object, index: number) => (
        <div>
          <button
            style={{
              width: 80,
              height: 30,
              textAlign: "center",
              border: "none",
              color: "#fff",
              backgroundColor: "#42b8a3",
            }}
            onClick={() => addFunction(dataSource1, setDataSource1, index)}
          >
            添加
          </button>
          <button
            style={{
              width: 80,
              height: 30,
              textAlign: "center",
              border: "none",
              color: "#fff",
              backgroundColor: "#e6596b",
              marginLeft: 10,
            }}
            onClick={() => delFunction(dataSource1, setDataSource1, index)}
          >
            删除
          </button>
        </div>
      ),
    },
  ];
  /* 治疗史 */
  const columns3: any = [
    {
      title: "药品",
      dataIndex: "medical",
      render: (val: number | string, row: object, index: number) => (
        <Select
          style={{ width: "100%" }}
          value={val}
          placeholder="请选择药品名称"
          onChange={(val) => {
            dataChange(val, index, "medical", 1);
          }}
        >
          {selectData &&
          selectData.config_medicine &&
          Array.isArray(selectData.config_medicine) &&
          selectData.config_medicine.length
            ? selectData.config_medicine.map((item: selectType) => {
                return (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                );
              })
            : null}
        </Select>
      ),
    },
    {
      title: "用法用量",
      dataIndex: "dosage",
      render: (val: number | string, row: object, index: number) => (
        <Input
          placeholder="请填写用法用量"
          value={val}
          onChange={(e) => {
            dataChange(e, index, "dosage", 2);
          }}
        />
      ),
    },
    {
      title: "开始日期（年/月/日）",
      dataIndex: "start_date",
      render: (val: number | string, row: object, index: number) => {
        let date: any = val ? moment(val).format("YYYY-MM-DD") : null;
        return (
          <DatePicker
            allowClear={false}
            value={date ? moment(date) : null}
            onChange={(e) => {
              dataChange(e, index, "start_date", 3);
            }}
            placeholder="请选择开始日期"
            style={{ width: "100%" }}
          />
        );
      },
    },
    {
      title: "结束日期（年/月/日）",
      dataIndex: "end_date",
      render: (val: number | string, row: object, index: number) => {
        let date: any = val ? moment(val).format("YYYY-MM-DD") : null;
        return (
          <DatePicker
            allowClear={false}
            value={date ? moment(date) : null}
            onChange={(e) => {
              dataChange(e, index, "end_date", 3);
            }}
            placeholder="请选择开始日期"
            style={{ width: "100%" }}
          />
        );
      },
    },
    {
      title: "是否继续",
      dataIndex: "is_continue",
      render: (val: number | string, row: object, index: number) => (
        <Checkbox
          checked={val ? true : false}
          onChange={(e) => {
            dataChange(e, index, "is_continue", 2);
          }}
        ></Checkbox>
      ),
    },
    {
      title: "操作",
      dataIndex: "address",
      width: 240,
      render: (val: string, row: object, index: number) => (
        <div>
          <button
            style={{
              width: 80,
              height: 30,
              textAlign: "center",
              border: "none",
              color: "#fff",
              backgroundColor: "#42b8a3",
            }}
            onClick={() => addFunction(dataSource, setDataSource, index)}
          >
            添加
          </button>
          <button
            style={{
              width: 80,
              height: 30,
              textAlign: "center",
              border: "none",
              color: "#fff",
              backgroundColor: "#e6596b",
              marginLeft: 10,
            }}
            onClick={() => delFunction(dataSource, setDataSource, index)}
          >
            删除
          </button>
        </div>
      ),
    },
  ];
  /* 用药史 */
  const columns4: any = [
    {
      title: "药品名",
      dataIndex: "medical",
      render: (val: number | string, row: object, index: number) => (
        <Select
          style={{ width: "100%" }}
          placeholder="请选择药品名称"
          value={val}
          onChange={(val) => {
            dataChange(val, index, "medical", 1);
          }}
        >
          {selectData &&
          selectData.config_medicine &&
          Array.isArray(selectData.config_medicine) &&
          selectData.config_medicine.length
            ? selectData.config_medicine.map((item: selectType) => {
                return (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                );
              })
            : null}
        </Select>
      ),
    },
    {
      title: "用药指征",
      dataIndex: "medical_feature",
      render: (val: number | string, row: object, index: number) => (
        <Input
          placeholder="请填写用药指征"
          value={val}
          onChange={(e) => {
            dataChange(e, index, "medical_feature", 2);
          }}
        />
      ),
    },
    {
      title: "用法用量",
      dataIndex: "dosage",
      render: (val: number | string, row: object, index: number) => (
        <Input
          placeholder="请填写用法用量"
          value={val}
          onChange={(e) => {
            dataChange(e, index, "dosage", 2);
          }}
        />
      ),
    },
    {
      title: "开始日期（年/月/日）",
      dataIndex: "start_date",
      render: (val: number | string, row: object, index: number) => {
        let date: any = val ? moment(val).format("YYYY-MM-DD") : null;
        return (
          <DatePicker
            allowClear={false}
            value={date ? moment(date) : null}
            onChange={(e) => {
              dataChange(e, index, "start_date", 3);
            }}
            placeholder="请选择开始日期"
            style={{ width: "100%" }}
          />
        );
      },
    },
    {
      title: "结束日期（年/月/日）",
      dataIndex: "end_date",
      render: (val: number | string, row: object, index: number) => {
        let date: any = val ? moment(val).format("YYYY-MM-DD") : null;
        return (
          <DatePicker
            allowClear={false}
            value={date ? moment(date) : null}
            onChange={(e) => {
              dataChange(e, index, "end_date", 3);
            }}
            placeholder="请选择开始日期"
            style={{ width: "100%" }}
          />
        );
      },
    },
    {
      title: "是否继续",
      dataIndex: "is_continue",
      render: (val: number | string, row: object, index: number) => (
        <Checkbox
          checked={val ? true : false}
          onChange={(e) => {
            dataChange(e, index, "is_continue", 2);
          }}
        ></Checkbox>
      ),
    },
    {
      title: "操作",
      dataIndex: "address",
      width: 240,
      render: (val: string, row: object, index: number) => (
        <div>
          <button
            style={{
              width: 80,
              height: 30,
              textAlign: "center",
              border: "none",
              color: "#fff",
              backgroundColor: "#42b8a3",
            }}
            onClick={() => addFunction(dataSource, setDataSource, index)}
          >
            添加
          </button>
          <button
            style={{
              width: 80,
              height: 30,
              textAlign: "center",
              border: "none",
              color: "#fff",
              backgroundColor: "#e6596b",
              marginLeft: 10,
            }}
            onClick={() => delFunction(dataSource, setDataSource, index)}
          >
            删除
          </button>
        </div>
      ),
    },
  ];
  // 基础信息查询
  return (
    <div className="medicalHistory">
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
          ? "疾病史"
          : orTab === 2
          ? "治疗史"
          : orTab === 3
          ? "用药史"
          : null}
      </button>
      {/* <button onClick={()=>setOrInquiry(true)} style={{
        backgroundColor:orInquiry?'#fff':'#fafafa',
        color:orInquiry?'#1abc9c':'',
      }}>质询</button> */}
      {orInquiry ? null : (
        <div style={{ padding: 15, backgroundColor: "#fff" }}>
          {orTab === 1 ? (
            <div>
              <div className="titles">
                <div />
                既往疾病史
              </div>
              <div className="rdos">
                患者既往疾病史：
                <Radio.Group value={
                    radioSelect
                      ? radioSelect
                      : radioSelect === 0
                      ? radioSelect
                      : null
                  }
                  onChange={(e) => {
                    setradioSelect(e.target.value);
                  }}>
                  <Radio value={1}>有</Radio>
                  <Radio value={0}>无</Radio>
                </Radio.Group>
              </div>
              <Table
                style={{ display: radioSelect ? "" : "none" }}
                dataSource={dataSource}
                columns={columns}
                bordered
                pagination={false}
              />
              <div className="titles">
                <div />
                手术史
              </div>
              <div className="rdos">
                重要的外科手术（操作）史：
                <Radio.Group value={
                    radioSelect1
                      ? radioSelect1
                      : radioSelect1 === 0
                      ? radioSelect1
                      : null
                  }
                  onChange={(e) => {
                    setradioSelect1(e.target.value);
                  }}>
                  <Radio value={1}>有</Radio>
                  <Radio value={0}>无</Radio>
                </Radio.Group>
              </div>
              <Table
                style={{ display: radioSelect1 ? "" : "none" }}
                dataSource={dataSource1}
                columns={columns1}
                bordered
                pagination={false}
              />
            </div>
          ) : orTab === 2 ? (
            <div>
              <div className="rdos">
                最近3个月内的IgA肾病治疗史：
                <Radio.Group
                  value={
                    radioSelect
                      ? radioSelect
                      : radioSelect === 0
                      ? radioSelect
                      : null
                  }
                  onChange={(e) => {
                    setradioSelect(e.target.value);
                  }}
                >
                  <Radio value={1}>有</Radio>
                  <Radio value={0}>无</Radio>
                </Radio.Group>
              </div>
              <Table
                style={{ display: radioSelect ? "" : "none" }}
                dataSource={dataSource}
                columns={columns3}
                bordered
                pagination={false}
              />
            </div>
          ) : orTab === 3 ? (
            <div>
              <div className="rdos">
                至今一年内患者使用（除治疗IgA肾病以外）的药物：
                <Radio.Group value={
                    radioSelect
                      ? radioSelect
                      : radioSelect === 0
                      ? radioSelect
                      : null
                  }
                  onChange={(e) => {
                    setradioSelect(e.target.value);
                  }}>
                  <Radio value={1}>有</Radio>
                  <Radio value={0}>无</Radio>
                </Radio.Group>
              </div>
              <Table
                style={{ display: radioSelect ? "" : "none" }}
                dataSource={dataSource}
                columns={columns4}
                bordered
                pagination={false}
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
