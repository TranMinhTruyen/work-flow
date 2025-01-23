import { SelectDataType } from '@/common/constants/typeConst';
import { ICard, IColumn } from '../model/type';

export const issueTypeSelect: SelectDataType[] = [
  {
    key: '0',
    value: 'Error',
  },
  {
    key: '1',
    value: 'Info',
  },
  {
    key: '2',
    value: 'Warning',
  },
];

export const statusTypeSelect: SelectDataType[] = [
  {
    key: '0',
    value: 'Open',
  },
  {
    key: '1',
    value: 'In progress',
  },
  {
    key: '2',
    value: 'Done',
  },
  {
    key: '3',
    value: 'Review',
  },
  {
    key: '4',
    value: 'Close',
  },
];

export const assigneeSelect: SelectDataType[] = [
  {
    key: '0',
    value: 'Assignee 1',
  },
  {
    key: '1',
    value: 'Assignee 2',
  },
  {
    key: '2',
    value: 'Assignee 3',
  },
  {
    key: '3',
    value: 'Assignee 4',
  },
  {
    key: '4',
    value: 'Assignee 5',
  },
];

export const columnData: IColumn[] = [
  {
    id: 1,
    title: 'Open',
  },
  {
    id: 2,
    title: 'Inprogess',
  },
  {
    id: 3,
    title: 'Resolve',
  },
];

export const cardData: ICard[] = [
  {
    id: 100,
    order: 0,
    columnId: 1,
    title: 'Card 1',
  },
  {
    id: 101,
    order: 1,
    columnId: 1,
    title: 'Card 2',
  },
  {
    id: 102,
    order: 2,
    columnId: 1,
    title: 'Card 3',
  },
  {
    id: 201,
    order: 0,
    columnId: 2,
    title: 'Card 4',
  },
  {
    id: 202,
    order: 1,
    columnId: 2,
    title: 'Card 5',
  },
];
