import IContent from './content';

export default interface ICategory {
  id: number;
  name: string;
  color?: string;
  content: IContent[];
}
