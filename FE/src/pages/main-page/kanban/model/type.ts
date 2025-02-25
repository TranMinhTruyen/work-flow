export interface IColumn {
  id: number;
  order: number;
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

export type UpdateCardPayload = {
  sourceColumnId?: number;
  sourceCardList?: ICard[];
  destinationColumnId?: number;
  destinationCardList?: ICard[];
};

export type CardMoveContext = {
  activeCardId: number;
  overCardId: number;
  activeColumnId: number;
  overColumnId: number;
  activeColumnIndex: number;
  overColumnIndex: number;
  activeCardIndex: number;
  overCardIndex: number;
};
