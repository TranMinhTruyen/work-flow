export default interface ISaveScreenResponse {
  id: string;
  screenId: string;
  screenName: string;
  screenUrl: string;
  active: boolean;
  createdDatetime?: string;
  updatedDatetime?: string;
  updatedBy?: string;
}
