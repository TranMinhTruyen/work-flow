import { IContent } from './Content';

export interface ICategory {
  id: number;
  name: string;
  color?: string;
  content: IContent[];
}
