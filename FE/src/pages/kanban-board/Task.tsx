import { memo } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { IContent } from 'model/kanban-board/content';
import Item from './Item';

type TaskProps = {
  data: IContent;
  index: number;
};

const Task = ({ index, data }: TaskProps) => {
  return (
    <Draggable draggableId={`${data.id}`} index={index}>
      {(provided, snapshot) => <Item provided={provided} snapshot={snapshot} data={data} />}
    </Draggable>
  );
};

export default memo(Task);
