import { IContent } from './content';

export interface ICategory {
  id: number;
  name: string;
  color?: string;
  content: IContent[];
}
