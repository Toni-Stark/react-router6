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
}
export { KingApi };
