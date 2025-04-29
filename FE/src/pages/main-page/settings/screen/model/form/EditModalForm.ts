export default interface IEditModalForm {
  screenId?: string;
  screenName?: string;
  screenUrl?: string;
  roles: string[];
  level: number;
  createdDatetime?: string;
  updatedDatetime?: string;
  active?: boolean;
}
