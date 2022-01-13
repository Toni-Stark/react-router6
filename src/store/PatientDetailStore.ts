import { makeAutoObservable, observable } from "mobx";

export class PatientDetailStore {
  @observable isRefresh: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
}
