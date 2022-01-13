import { makeAutoObservable, observable } from "mobx";

export class PatientDetailStore {
  @observable isRefresh: boolean = false;
  @observable detailId: string | number = "";
  @observable tabId: string | number = "";
  @observable finishCount?: string = "";
  @observable tabTitle?: string = "";
  @observable nameId?: string = "";
  @observable total?: string = "";

  constructor() {
    makeAutoObservable(this);
  }
}
