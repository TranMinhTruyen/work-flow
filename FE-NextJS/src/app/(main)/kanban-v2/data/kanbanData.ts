import { SelectDataType } from '@/common/constants/typeConst';
import { IColumn } from '../model/type';

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

export const open: IColumn = {
  id: 0,
  name: 'Open',
  color: 'rgba(75, 235, 50)',
  cardList: [
    {
      id: 0,
      categoryId: 0,
      title: 'CDC-fluzo-1048',
      type: {
        typeName: 'Error',
        typeColor: 'rgba(235, 52, 52)',
      },
      content:
        'This is content of item 0, John Wick, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet',
      assignee: 'John Wick',
      dueDate: '01/04/2024',
      priority: 'high',
    },
    {
      id: 1,
      categoryId: 0,
      title: 'CDC-FLUZO-1065',
      type: {
        typeName: 'Info',
      },
      content:
        'This is content of item 1, John Wick chapter 2, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet',
      assignee: 'Winton',
      dueDate: '02/04/2024',
      priority: 'low',
    },
    {
      id: 2,
      categoryId: 0,
      title: 'CDC-FLUZO-2052',
      type: {
        typeName: 'Warning',
        typeColor: 'rgba(250, 250, 5)',
      },
      content: 'This is content of item 2, John Wick chapter 3, Lorem ipsum dolor sit amet',
      assignee: 'Charon',
      dueDate: '03/04/2024',
      priority: 'normal',
    },
    {
      id: 3,
      categoryId: 0,
      title: 'item 3',
    },
  ],
};

export const inProgress: IColumn = {
  id: 1,
  name: 'In progress',
  color: 'rgba(235, 52, 52)',
  cardList: [
    {
      id: 4,
      categoryId: 1,
      title: 'item 4',
    },
    {
      id: 5,
      categoryId: 1,
      title: 'item 5',
    },
    {
      id: 6,
      categoryId: 1,
      title: 'item 6',
    },
    {
      id: 7,
      categoryId: 1,
      title: 'item 7',
    },
  ],
};

export const done: IColumn = {
  id: 2,
  name: 'Done',
  color: 'rgba(55, 115, 250)',
  cardList: [
    {
      id: 8,
      categoryId: 2,
      title: 'item 8',
    },
    {
      id: 9,
      categoryId: 2,
      title: 'item 9',
    },
    {
      id: 10,
      categoryId: 2,
      title: 'item 10',
    },
    {
      id: 11,
      categoryId: 2,
      title: 'item 11',
    },
  ],
};

export const review: IColumn = {
  id: 3,
  name: 'Review',
  color: 'rgba(250, 250, 50)',
  cardList: [
    {
      id: 12,
      categoryId: 3,
      title: 'item 12',
    },
    {
      id: 13,
      title: 'item 13',
    },
    {
      id: 14,
      title: 'item 14',
    },
    {
      id: 15,
      title: 'item 15',
    },
  ],
};

export const close: IColumn = {
  id: 4,
  name: 'Close',
  color: 'rgba(175, 180, 180)',
  cardList: [
    {
      id: 16,
      title: 'item 16',
    },
    {
      id: 17,
      title: 'item 17',
    },
    {
      id: 18,
      title: 'item 18',
    },
    {
      id: 19,
      title: 'item 19',
    },
  ],
};

export const test: IColumn = {
  id: 5,
  name: 'test',
  cardList: [
    {
      id: 20,
      title: 'item 20',
    },
    {
      id: 21,
      title: 'item 21',
    },
    {
      id: 22,
      title: 'item 22',
    },
    {
      id: 23,
      title: 'item 23',
    },
  ],
};

export const sampleData: IColumn[] = [open, inProgress, done, review, close, test];
