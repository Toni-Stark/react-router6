export type ExampleType = {};
export type ImportPatientType = {
  kh: string;
  entry_time: string;
};
export type GetPatientListType = {
  limit: number;
  name: string | null;
  page: number;
  config_diagnosis: string | null;
  gender: string | boolean | number;
};
export type DistListType = {
  config_diagnosis: Array<Partial<FormItem>>;
  config_medicine: Array<Partial<FormItem>>;
};

export type FormItem = {
  name: string;
  value: string;
  id: string | number;
};
// 查询访视
export type VisitType = {
  id: string | number | undefined;
};
// 查询表单
export type FormType = {
  patient_visit_id: string | number | undefined;
};
// 查询人口
export type PopulationType = {
  visit_content_id: number | undefined | null;
};

export type CurrentPaginationType = (page: number, pageSize: number) => void;
