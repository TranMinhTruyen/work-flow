import IContent from './Content';

export default interface ICategory {
  id: number;
  name: string;
  color?: string;
  content: IContent[];
}
