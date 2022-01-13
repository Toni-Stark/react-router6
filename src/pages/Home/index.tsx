import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  Progress,
  Input,
  Select,
  message,
  Modal,
  Form,
  Table,
  DatePicker,
} from "antd";
import { FormBox } from "../../component/FormBox";
import { FormText } from "../../component/FormText";
import { FormDescriptions } from "../../component/FormDescriptions";
import "./index.scss";
import { SearchOutlined } from "@ant-design/icons";
import { StatisticTag } from "../../component/StatisticTag";
import moment from "moment";
import { MessageItem } from "../../component/MessageItem";
import { KingApi } from "../../request/king";
import {
  CurrentPaginationType,
  DistListType,
  GetPatientListType,
} from "../../request/types";
import { genderConfig, tableColumns } from "./config";
interface Props {}
const { Option } = Select;

export const Home = (props: Partial<Props>): React.ReactElement => {
  const navigator = useNavigate();
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [sideRow, setSizeRow] = useState<number>(18);
  const [mainRow, setMainRow] = useState<number>(6);
  const [hisVisible, setHisVisible] = useState<boolean>(false);
  const [searchName, setSearchName] = useState<string>("");
  const [gender, setGender] = useState<string>("0");
  const [diagnostic, setDiagnostic] = useState<string | null>(null);
  const [patientList, setPatientList] = useState<any>([]);
  const [total, setTotal] = useState<any>(0);
  const [page, setPage] = useState<any>(1);
  const [pageSize, setPageSize] = useState(10);
  const [distList, setDistList] = useState<DistListType>();
  const [statistics, setStatistics] = useState<any>({});
  const [showMore, setShowMore] = useState<boolean>(true);
  const [dynamicList, setDynamicList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [entryTime, setEntryTime] = useState<any>(moment(new Date()));
  const [KH, setKH] = useState<any>();

  const resize = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    if (width < 1200) {
      setSizeRow(24);
      setMainRow(24);
    } else {
      setSizeRow(18);
      setMainRow(6);
    }
    setInnerHeight(height);
  };
  const screenChange = () => {
    window.addEventListener("resize", resize);
  };
  useEffect(() => {
    setPage(1);
    setPageSize(10);
    setSearchName("");
    setGender("0");
    setDiagnostic(null);
    getPatientList({ page: 1, limit: 10 });
    getDynamic({ page: 1, limit: 8 });
    getDictList();
    getStatistics();
    screenChange();
  }, []);

  const getPatientList = (config?: Partial<GetPatientListType>) => {
    const params: Partial<GetPatientListType> = {
      limit: config?.limit,
      name: searchName,
      page: config?.page,
      gender,
    };
    console.log(config);
    KingApi.requestPatientList(params).then((res) => {
      if (res.success) {
        setPatientList(res.data.data);
        setTotal(res.data?.total);
        if (config?.page) {
          setPage(config?.page);
        }
      } else {
        message.error(res.error);
      }
    });
  };

  const getDictList = () => {
    KingApi.getDistList({}).then((res) => {
      if (res.success) {
        setDistList(res.data);
      } else {
        message.error(res.error);
      }
    });
  };
  const getStatistics = async () => {
    let res: any = await KingApi.getStatistics();
    if (res.success) {
      setStatistics(res.data);
    } else {
      message.error(res.error);
    }
  };

  const getDynamic = (params?: Partial<GetPatientListType>) => {
    KingApi.getDynamic(params).then((res) => {
      if (res.success) {
        if (params?.page === 1) {
          setDynamicList(res.data.data);
        } else {
          if (res.data.data?.length === 0) {
            setShowMore(false);
          } else {
            setShowMore(true);
          }
          setDynamicList([...dynamicList, ...res.data.data]);
        }
      } else {
        message.error(res.error);
      }
    });
  };

  const handleHisOk = () => {
    setLoading(true);
    let params = {
      kh: KH,
      entry_time: moment(entryTime).format("YYYY-MM-DD"),
    };
    if (!params?.kh) {
      message.warning("ID/身份证号不能为空");
      return;
    }
    if (!params?.entry_time || params?.entry_time === "Invalid date") {
      params.entry_time = moment(new Date()).format("YYYY-MM-DD");
      setEntryTime(moment(new Date()).format("YYYY-MM-DD"));
    }

    KingApi.importPatient({ ...params }).then((res) => {
      if (res.success) {
        message.success(res.error);
        getStatistics();
        getPatientList();
        setHisVisible(false);
      } else {
        message.error(res.error);
      }
      setLoading(false);
    });
  };

  const handleHisCancel = () => {
    setHisVisible(false);
  };

  const onSearchMore = () => {
    let page = 1;
    let currentPage = parseInt(String(dynamicList.length / 8));
    if (currentPage === 0) {
      page = 1;
    } else if (currentPage === dynamicList.length / 8) {
      page = currentPage + 1;
    } else if (currentPage !== dynamicList.length / 8) {
      setShowMore(false);
      return;
    }
    getDynamic({
      page: page,
      limit: 8,
    });
  };

  const onFormChange = (value: any, type: string) => {
    switch (type) {
      case "kh":
        setKH(value);
        break;
      case "entry_time":
        setEntryTime(moment(value).format("YYYY-MM-DD"));
        break;
    }
  };

  const currentPagination: CurrentPaginationType = (
    pages: number,
    limit: number
  ) => {
    let currentPage = limit === pageSize ? pages : 1;
    if ((limit === pageSize && pages !== page) || limit !== pageSize) {
      setPageSize(limit);
      setPage(currentPage);
      getPatientList({ page: currentPage, limit: limit });
    }
  };

  const currentModal = useMemo(() => {
    return (
      <Modal
        title="导入患者"
        visible={hisVisible}
        className="home-modal"
        okButtonProps={{ loading, style: { backgroundColor: "#1abc9c" } }}
        onOk={handleHisOk}
        onCancel={handleHisCancel}
      >
        <div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <div style={{ width: 120, textAlign: "right" }}>ID/身份证号： </div>
            <Input
              style={{ display: "flex", width: 300 }}
              placeholder="请输入ID/身份证号"
              value={KH}
              onChange={(e) => {
                onFormChange(e.target.value, "kh");
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 120, textAlign: "right" }}>入组时间： </div>
            <DatePicker
              placeholder="请选择入组时间"
              value={moment(entryTime)}
              onChange={(e) => {
                onFormChange(e, "entry_time");
              }}
            />
          </div>
        </div>
      </Modal>
    );
  }, [hisVisible, loading, KH, entryTime]);

  return (
    <div className="home-body">
      <Row gutter={{ xs: 16, sm: 16, md: 16, lg: 16 }}>
        <Col span={sideRow}>
          <div className="home-detail-card">
            <div>{statistics?.xmmc}</div>
            <div className="detail-card-main">
              <div className="detail-start">
                <div className="detail-start-tags">
                  <FormText label="项目状态" name="进行中" fontSize="16px" />
                  <FormText
                    label="项目负责人"
                    name={statistics?.xmfzr}
                    fontSize="16px"
                    justifyContent="flex-end"
                  />
                </div>
                <div className="detail-end-tags">
                  <div style={{ width: "70%" }}>
                    <FormDescriptions
                      name="项目进度"
                      value={`当前进度${
                        statistics?.xmjd === 0 ? 0 : statistics?.xmjd || 0
                      }%`}
                    >
                      <Progress
                        style={{ marginTop: 5 }}
                        percent={statistics?.xmjd}
                        strokeWidth={15}
                        strokeColor="#1abc9c"
                        showInfo={false}
                      />
                    </FormDescriptions>
                  </div>
                  <div>
                    <StatisticTag name="入组病案数" count={statistics?.rzal} />
                  </div>
                </div>
              </div>
              <div className="detail-start">
                <FormText
                  label="科研中心"
                  name={statistics?.kyzx}
                  fontSize="16px"
                  justifyContent="center"
                />
                <div className="detail-end-main">
                  <div className="end-main-start">
                    <StatisticTag name="总访视" count={statistics?.zfs} />
                  </div>
                  <div className="end-main-end">
                    <StatisticTag name="过期访视" count={statistics?.gqfs} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="home-detail-card"
            style={{
              borderTopWidth: 0,
              height: innerHeight - 300,
              minHeight: 480,
              paddingBottom: sideRow === 24 ? 20 : 100,
            }}
          >
            <div className="home-select-banner">
              <div>
                <Button
                  className="home-btn-primary"
                  style={{ marginRight: 10 }}
                  onClick={() => {
                    setHisVisible(true);
                  }}
                >
                  入组患者
                </Button>
              </div>
              <div style={{ display: "flex" }}>
                <Input
                  style={{ minWidth: 150, marginRight: 10 }}
                  className="home-btn-default"
                  value={searchName}
                  onChange={(e) => {
                    setSearchName(e.target.value);
                  }}
                  placeholder="姓名/ID号"
                />
                <div
                  className="home-select-default"
                  style={{ marginRight: 10 }}
                >
                  <Select
                    placeholder={genderConfig.placeholder}
                    style={{ minWidth: 150 }}
                    value={gender}
                    onChange={(e) => setGender(e)}
                  >
                    {genderConfig.elements?.map((item, index) => (
                      <Option value={item.value} key={index}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </div>
                <Button
                  className="home-btn-primary"
                  icon={<SearchOutlined />}
                  onClick={() => {
                    getPatientList({ page: 1, limit: pageSize });
                  }}
                >
                  查询
                </Button>
              </div>
            </div>
            <div className="home-table">
              <Table
                style={{ marginTop: 15 }}
                bordered={true}
                rowKey={(row: any) => row.id.toString()}
                columns={tableColumns}
                dataSource={patientList}
                onRow={(row) => {
                  return {
                    onClick: () => {
                      localStorage.setItem("patient_data", JSON.stringify(row));
                      navigator(`patientDetail/detail?id=${row.id}`);
                    },
                  };
                }}
                pagination={{
                  pageSizeOptions: ["10", "20", "50", "100"],
                  showTotal: (total) => `共 ${total} 条数据`, // 用于显示数据总量和当前数据顺序
                  showSizeChanger: true,
                  showQuickJumper: true,
                  current: page,
                  pageSize: pageSize,
                  total: total,
                  onChange: currentPagination,
                }}
              />
            </div>
          </div>
        </Col>
        <Col span={mainRow}>
          <div
            style={{
              border: "1px solid rgba(233, 233, 233, 1)",
              padding: 15,
              height: innerHeight - 110,
              minHeight: 670,
              overflowY: "scroll",
            }}
          >
            <FormBox name="项目动态">
              {dynamicList?.map((item?: any, index?: number) => (
                <MessageItem
                  key={index}
                  name={item?.user}
                  updated_at={item?.datetime}
                >
                  <div style={{ display: "flex", marginTop: 10 }}>
                    {item?.status}&nbsp;&nbsp;&nbsp;
                    <div style={{ color: "#1abc9c" }}>
                      {item?.patient_name} {item?.visit} {item?.content}
                    </div>
                  </div>
                </MessageItem>
              ))}
              <div
                className="home-pagination"
                style={{
                  cursor: "pointer",
                  display: showMore ? "block" : "none",
                }}
                onClick={() => {
                  onSearchMore();
                }}
              >
                查看更多
              </div>
            </FormBox>
          </div>
        </Col>
      </Row>
      {currentModal}
    </div>
  );
};
