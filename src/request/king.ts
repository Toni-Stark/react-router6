import { Api } from "./config";
import {
  GetPatientListType,
  ImportPatientType,
  ExampleType,
  VisitType,
  FormType,
  PopulationType,
} from "./types";

class KingApi {
  static async Example(params: ExampleType) {
    return await Api.getInstance.get({
      url: "/api/research/config/detail",
      params,
    });
  }
  static async importPatient(params: ImportPatientType) {
    return await Api.getInstance.post({
      url: "/patient/patient/import",
      params,
    });
  }
  static async requestPatientList(params?: Partial<GetPatientListType>) {
    return await Api.getInstance.post({
      url: "/patient/patient/patientList",
      params,
    });
  }
  static async getDistList(params: ExampleType) {
    return await Api.getInstance.get({
      url: "/patient/dict/dictList",
      params,
    });
  }
  static async getStatistics(params?: ExampleType) {
    return await Api.getInstance.get({
      url: "/project/project/statistics",
      params,
    });
  }
  /* 查询患者访视 */
  static async visitApi(params: VisitType) {
    return await Api.getInstance.post({
      url: "/project/project/getPatientVisit",
      params,
    });
  }
  /* 查询患者表单 */
  static async formApi(params: FormType) {
    return await Api.getInstance.post({
      url: "/project/project/getVisitContent",
      params,
    });
  }
  /*人口学  */
  static async populationApi(params: PopulationType) {
    return await Api.getInstance.post({
      url: "/project/project/getPopulationFeature",
      params,
    });
  }
  /*生命体征  */
  static async lifeApi(params: PopulationType) {
    return await Api.getInstance.post({
      url: "/project/project/getVitalSigns",
      params,
    });
  }
  /*体格检查  */
  static async physiqueApi(params: PopulationType) {
    return await Api.getInstance.post({
      url: "/project/project/physicalExam",
      params,
    });
  }
  /*合并治疗  */
  static async mergeApi(params: PopulationType) {
    return await Api.getInstance.post({
      url: "/project/project/combined",
      params,
    });
  }
  /*不良事件  */
  static async badApi(params: PopulationType) {
    return await Api.getInstance.post({
      url: "/project/project/adverseEvents",
      params,
    });
  }
  /*实验室检查  */
  static async laboratoryApi(params: PopulationType) {
    return await Api.getInstance.post({
      url: "/project/project/summary",
      params,
    });
  }
  /*实验室检查同步  */
  static async laboratorySynchronizationApi(params: PopulationType) {
    return await Api.getInstance.post({
      url: "/project/project/getLisResult",
      params,
    });
  }
  /*停止用药  */
  static async stopApi(params: PopulationType) {
    return await Api.getInstance.post({
      url: "/project/project/stopMedicationInfo",
      params,
    });
  }
  /*治疗史  */
  static async treatmentApi(params: PopulationType) {
    return await Api.getInstance.post({
      url: "/project/project/getTreatHistory",
      params,
    });
  }
  /*疾病史  */
  static async diseaseApi(params: PopulationType) {
    return await Api.getInstance.post({
      url: "/project/project/getDiseaseHistory",
      params,
    });
  }
  /*用药史  */
  static async medicationApi(params: PopulationType) {
    return await Api.getInstance.post({
      url: "/project/project/getMedicalHistory",
      params,
    });
  }
  /*人口学保存  */
  static async submitPopulationApi(params: any) {
    return await Api.getInstance.post({
      url: "/project/project/addPopulationFeature",
      params,
    });
  }
  /*生命体征保存  */
  static async submitLifeApi(params: any) {
    return await Api.getInstance.post({
      url: "/project/project/addVitalSigns",
      params,
    });
  }
  /*体格检验保存  */
  static async submitPhysiqueApi(params: any) {
    return await Api.getInstance.post({
      url: "/project/project/addPhysicalExam",
      params,
    });
  }
  /*合并治疗保存  */
  static async submitMergeApi(params: any) {
    return await Api.getInstance.post({
      url: "/project/project/addCombined",
      params,
    });
  }
  /*不良事件保存  */
  static async submitBadApi(params: any) {
    return await Api.getInstance.post({
      url: "/project/project/addAdverseEvents",
      params,
    });
  }
  /*实验室检查保存  */
  static async submitLaboratoryApi(params: any) {
    return await Api.getInstance.post({
      url: "/project/project/addSummary",
      params,
    });
  }
  /*停止用药保存 */
  static async submitStopApi(params: any) {
    return await Api.getInstance.post({
      url: "/project/project/addStopMedication",
      params,
    });
  }
  /*治疗史保存  */
  static async submitTreatmentApi(params: any) {
    return await Api.getInstance.post({
      url: "/project/project/addTreatHistory",
      params,
    });
  }
  /*用药保存  */
  static async submitMedicationApi(params: any) {
    return await Api.getInstance.post({
      url: "/project/project/addMedicalHistory",
      params,
    });
  }
  /*疾病史保存  */
  static async submitDiseaseApi(params: any) {
    return await Api.getInstance.post({
      url: "/project/project/addDiseaseHistory",
      params,
    });
  }
  static async getDynamic(params?: Partial<GetPatientListType>) {
    return await Api.getInstance.get({
      url: "/project/project/getDynamic",
      params,
    });
  }
}
export { KingApi };
