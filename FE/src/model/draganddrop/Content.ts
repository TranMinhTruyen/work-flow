export default interface IContent {
  id: number;
  categoryId?: number;
  title: string;
  type?: TaskType;
  content?: string;
  assignee?: string;
  dueDate?: string;
  priority?: string;
}

export interface TaskType {
  typeName?: string;
  typeColor?: string;
}
