'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import { CSSProperties, memo, useMemo } from 'react';
import { ICard, IColumn } from '../model/type';
import Card from './Card';

export type ColumnProps = {
  columnData: IColumn;
  cardList: ICard[];
};

const Column = (props: ColumnProps) => {
  const { columnData, cardList } = props;

  const { setNodeRef, isOver } = useDroppable({
    id: `col-${columnData.id}`,
    data: {
      type: 'COLUMN',
      columnData: columnData,
    },
  });

  const cardId = useMemo(() => {
    return cardList.map(item => item.id);
  }, [cardList]);

  const style: CSSProperties = {
    backgroundColor: isOver ? '#f0f0f0' : '#fafafa',
    padding: '16px',
    minHeight: '500px',
    width: '300px',
    marginRight: '16px',
  };

  return (
    <Paper ref={setNodeRef} style={style}>
      <Typography variant={'h6'}>{columnData.title}</Typography>
      <Box>
        <SortableContext items={cardId}>
          {cardList.map(card => (
            <Card key={card.id} cardData={card} />
          ))}
        </SortableContext>
      </Box>
    </Paper>
  );
};

export default memo(Column);
