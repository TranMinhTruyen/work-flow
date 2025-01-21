'use client';

import { useSortable } from '@dnd-kit/sortable';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { CSSProperties, memo } from 'react';
import { ICard } from '../model/type';

export type CardProps = {
  cardData: ICard;
};

const Card = (props: CardProps) => {
  const { cardData } = props;
  const { setNodeRef, attributes, listeners, transform, isDragging } = useSortable({
    id: cardData.id,
    data: cardData,
  });

  const style: CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
    marginBottom: '8px',
  };

  return (
    <Paper ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <Typography variant={'body1'}>{cardData.title}</Typography>
    </Paper>
  );
};

export default memo(Card);
