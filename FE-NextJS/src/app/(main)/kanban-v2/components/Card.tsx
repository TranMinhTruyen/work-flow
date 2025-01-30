'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { CSSProperties, memo } from 'react';
import { ICard } from '../model/type';

export type CardProps = {
  cardData: ICard;
};

const Card = (props: CardProps) => {
  const { cardData } = props;
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: cardData.id,
    data: {
      type: 'CARD',
      columnId: cardData.columnId,
      cardData,
    },
  });

  const style: CSSProperties = {
    transition,
    transform: CSS.Transform.toString(transform),
    cursor: 'grab',
    marginBottom: '8px',
    height: '50px',
  };

  if (isDragging) {
    return (
      <Paper
        ref={setNodeRef}
        variant={'outlined'}
        style={{
          transition,
          transform: CSS.Transform.toString(transform),
          backgroundColor: 'rgba(200, 200, 200, 0.8)',
          cursor: 'grab',
          height: '50px',
          marginBottom: '8px',
        }}
      ></Paper>
    );
  }

  return (
    <Paper ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Typography variant={'body1'}>{cardData.title}</Typography>
    </Paper>
  );
};

export default memo(Card);
