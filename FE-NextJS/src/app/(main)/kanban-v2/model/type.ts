export interface IColumn {
  id: number;
  title: string;
  color?: string;
}

export interface ICard {
  id: number;
  columnId: number;
  order: number;
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

export interface IData {
  columnId: number;
  cards: ICard[];
}
