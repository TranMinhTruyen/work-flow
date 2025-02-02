'use client';

import { Type } from '@/common/enums/BoardEnum';
import { useAppSelector } from '@/lib/store';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { CSSProperties, memo, useMemo } from 'react';
import { ICard, IColumn } from '../model/type';
import { selectIsColumnDragging } from '../services/kanbanSlice';
import Card from './Card';

export type ColumnProps = {
  columnData: IColumn;
  cardList: ICard[];
};

const Column = (props: ColumnProps) => {
  const { columnData, cardList } = props;

  const isColumnDragging = useAppSelector(selectIsColumnDragging);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: columnData.id,
    data: {
      type: Type.COLUMN,
      columnData: columnData,
    },
    disabled: !isColumnDragging,
  });

  const cardId = useMemo(() => cardList.map(item => item.id), [cardList]);

  const cards = useMemo(() => {
    return cardList.map(card => <Card key={card.id} cardData={card} />);
  }, [cardList]);

  const style: CSSProperties = {
    transition,
    transform: CSS.Transform.toString(transform),
    cursor: isColumnDragging ? 'grab' : 'default',
  };

  const containerStyle: CSSProperties = {
    backgroundColor: 'rgba(225, 225, 225, 0.8)',
    padding: '10px',
    minHeight: '80vh',
    maxHeight: '80vh',
    overflow: 'auto',
    width: '300px',
  };

  if (isDragging) {
    return (
      <Box ref={setNodeRef} style={style}>
        <Typography variant={'h6'}>{columnData.title}</Typography>
        <Paper variant={'outlined'} style={containerStyle}></Paper>
      </Box>
    );
  }

  return (
    <Box ref={setNodeRef} style={style}>
      <Typography variant={'h6'} {...listeners} {...attributes}>
        {columnData.title}
      </Typography>
      <Paper variant={'outlined'} style={containerStyle}>
        <SortableContext items={cardId}>{cards}</SortableContext>
      </Paper>
    </Box>
  );
};

export default memo(Column);
