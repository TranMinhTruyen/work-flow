'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import { CSSProperties, memo } from 'react';
import { IColumn } from '../model/type';
import Card from './Card';

export type ColumnProps = {
  columnData: IColumn;
};

const Column = (props: ColumnProps) => {
  const { columnData } = props;

  const { setNodeRef, isOver } = useDroppable({
    id: columnData.id,
    data: columnData,
  });

  const style: CSSProperties = {
    backgroundColor: isOver ? '#f0f0f0' : '#fafafa',
    padding: '16px',
    minHeight: '500px',
    width: '300px',
    marginRight: '16px',
  };

  return (
    <Paper ref={setNodeRef} style={style}>
      <Typography variant={'h6'}>{columnData.name}</Typography>
      <Box>
        <SortableContext items={columnData.cardList}>
          {columnData.cardList.map(card => (
            <Card key={card.id} cardData={card} />
          ))}
        </SortableContext>
      </Box>
    </Paper>
  );
};

export default memo(Column);
