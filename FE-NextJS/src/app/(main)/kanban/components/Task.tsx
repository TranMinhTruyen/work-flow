import { IContent } from '@/app/(main)/kanban/model/Content';
import { Draggable } from '@hello-pangea/dnd';
import { memo } from 'react';
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
