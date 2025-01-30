'use client';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import {
  closestCorners,
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Box from '@mui/material/Box';
import Stack from '@mui/system/Stack';
import { memo, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { cardData } from '../data/kanbanData';
import { eventDragDropAction, eventDragDropMoveAction } from '../services/action';
import {
  selectActiveCard,
  selectCardList,
  selectColumnList,
  setActiveCard,
} from '../services/kanbanSlice';
import Card from './Card';
import Column from './Column';

const Board = () => {
  const dispatch = useAppDispatch();

  const columnList = useAppSelector(selectColumnList);
  const activeCard = useAppSelector(selectActiveCard);
  const cardList = useAppSelector(selectCardList);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;

      const activeId = active.id as number;

      const card = cardData.find(item => item.id === activeId);

      if (card && !activeCard) {
        dispatch(setActiveCard(card));
      }
    },
    [activeCard, dispatch]
  );

  /**
   * Handle drop event.
   */
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over) {
        eventDragDropAction(active, over);
        dispatch(setActiveCard(null));
      }
    },
    [dispatch]
  );

  /**
   * Handle dragging event
   */
  const handleDragMove = useCallback((event: DragMoveEvent) => {
    const { active, over } = event;
    if (over) {
      eventDragDropMoveAction(active, over);
    }
  }, []);

  /**
   * Handle dragging event
   */
  const handleDragCancer = useCallback(
    (event: DragCancelEvent) => {
      dispatch(setActiveCard(null));
    },
    [dispatch]
  );

  const columns = useMemo(() => {
    return columnList.map(column => {
      const cardData = cardList.find(item => item.columnId === column.id)?.cards;
      return (
        <Box key={column.id} margin={10} width={250}>
          <Column key={column.id} columnData={column} cardList={cardData ?? []} />
        </Box>
      );
    });
  }, [cardList, columnList]);

  const overlay = useMemo(() => {
    if (activeCard) {
      return <Card key={activeCard.id} cardData={activeCard} />;
    }
  }, [activeCard]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      onDragCancel={handleDragCancer}
    >
      <Stack direction={'row'} spacing={10}>
        {columns}
      </Stack>
      {createPortal(<DragOverlay>{overlay}</DragOverlay>, document.body)}
    </DndContext>
  );
};

export default memo(Board);
