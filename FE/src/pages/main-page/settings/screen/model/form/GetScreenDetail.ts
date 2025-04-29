export default interface IGetScreenDetail {
  id?: string;
  screenId?: string;
  screenNameEn?: string;
  screenNameVi?: string;
  screenNameJa?: string;
  screenUrl?: string;
  isActive?: boolean;
  roles: string[];
  level: number;
  createdDatetime?: string;
  updatedDatetime?: string;
}
