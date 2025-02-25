import mockData from '../data/mockData.json';
import { IScreenMasterRow } from '../model/Table';

export const initMockData = () => {
  const data: IScreenMasterRow[] = mockData.map(item => ({ ...item }));
  return data;
};
