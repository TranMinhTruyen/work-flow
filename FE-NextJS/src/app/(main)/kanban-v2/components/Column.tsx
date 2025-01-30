'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { CSSProperties, memo, useMemo } from 'react';
import { ICard, IColumn } from '../model/type';
import Card from './Card';

export type ColumnProps = {
  columnData: IColumn;
  cardList: ICard[];
};

const Column = (props: ColumnProps) => {
  const { columnData, cardList } = props;

  const { setNodeRef } = useDroppable({
    id: columnData.id,
    data: {
      type: 'COLUMN',
      columnData: columnData,
    },
  });

  const cardId = useMemo(() => {
    if (cardList) {
      return cardList.map(item => item.id);
    }
    return [];
  }, [cardList]);

  const cards = useMemo(() => {
    if (cardList) return cardList.map(card => <Card key={card.id} cardData={card} />);
    return [];
  }, [cardList]);

  const style: CSSProperties = {
    backgroundColor: 'rgba(225, 225, 225, 0.8)',
    padding: '10px',
    minHeight: '500px',
    maxHeight: '500px',
    overflow: 'auto',
    width: '300px',
  };

  return (
    <Box>
      <Typography variant={'h6'}>{columnData.title}</Typography>
      <Paper variant={'outlined'} ref={setNodeRef} style={style}>
        <SortableContext items={cardId}>{cards}</SortableContext>
      </Paper>
    </Box>
  );
};

export default memo(Column);
