'use client';

import { CURRENT_PATH } from '@/common/constants/commonConst';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { cardData, columnData } from '../data/kanbanData';
import { ICard, IColumn } from '../model/type';
import Card from './Card';
import Column from './Column';

const Board = () => {
  const [column, setColumn] = useState<IColumn[]>([]);
  const [card, setCard] = useState<ICard[]>([]);
  const [activeCard, setActiveCard] = useState<ICard | null>(null);
  const path = usePathname();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  useEffect(() => {
    setColumn(columnData);
    setCard(cardData);
    sessionStorage.setItem(CURRENT_PATH, path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    setActiveCard(active.data.current?.cardData as ICard);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveCard(null);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const srcColIndex = active.data.current?.cardData.columnId;
    const desColIndex = over.data.current?.columnData.id;

    setCard(prev => {
      const cardIndex = prev.findIndex(item => item.columnId === srcColIndex);
      if (cardIndex !== -1) {
        prev[cardIndex].columnId = desColIndex;
        return prev;
      }
      return prev;
    });

    setActiveCard(null);
  }, []);

  const overlay = useMemo(() => {
    if (activeCard) {
      return <Card key={activeCard.id} cardData={activeCard} />;
    }
  }, [activeCard]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
    >
      <Box display={'flex'} justifyContent={'flex-start'} padding={4}>
        {column.map(column => (
          <Box key={column.id} margin={10} width={250}>
            <Column
              key={column.id}
              columnData={column}
              cardList={card.filter(item => item.columnId === column.id)}
            />
          </Box>
        ))}
      </Box>
      {createPortal(<DragOverlay>{overlay}</DragOverlay>, document.body)}
    </DndContext>
  );
};

export default memo(Board);
