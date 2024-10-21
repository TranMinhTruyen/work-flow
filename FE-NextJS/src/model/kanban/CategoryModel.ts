import { IContent } from './ContentModel';

export interface ICategory {
  id: number;
  name: string;
  color?: string;
  content: IContent[];
}
