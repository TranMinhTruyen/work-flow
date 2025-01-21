export interface IColumn {
  id: number;
  name: string;
  color?: string;
  cardList: ICard[];
}

export interface ICard {
  id: number;
  categoryId?: number;
  title: string;
  type?: ITaskType;
  content?: string;
  assignee?: string;
  dueDate?: string;
  priority?: string;
}

export interface ITaskType {
  typeName?: string;
  typeColor?: string;
}
