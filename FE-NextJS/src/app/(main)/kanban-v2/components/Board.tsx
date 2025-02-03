'use client';

import { useAppDispatch, useAppSelector } from '@/lib/store';
import {
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
import { SortableContext } from '@dnd-kit/sortable';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Stack from '@mui/system/Stack';
import { memo, SyntheticEvent, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { eventDragMoveAction, eventDropAction } from '../services/action';
import {
  selectActiveCard,
  selectActiveColumn,
  selectCardList,
  selectColumnList,
  selectIsColumnDragging,
  setActiveCard,
  setActiveColumn,
  toggleColumnDragging,
} from '../services/kanbanSlice';
import Card from './Card';
import Column from './Column';

const Board = () => {
  const dispatch = useAppDispatch();

  const isColumnDragging = useAppSelector(selectIsColumnDragging);
  const columnList = useAppSelector(selectColumnList);
  const cardList = useAppSelector(selectCardList);
  const activeCard = useAppSelector(selectActiveCard);
  const activeColumn = useAppSelector(selectActiveColumn);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;

      const isCard = active.data.current?.type === 'CARD';

      if (isCard) {
        const activeId = active.id as number;
        const cardData = cardList.flatMap(item => item.cards);
        const card = cardData.find(item => item.id === activeId);
        if (card && !activeCard) {
          dispatch(setActiveCard(card));
        }
      } else {
        const activeId = active.id as number;
        const column = columnList.find(item => item.id === activeId);
        if (column && !activeCard) {
          dispatch(setActiveColumn(column));
        }
      }
    },
    [activeCard, cardList, columnList, dispatch]
  );

  /**
   * Handle drop event.
   */
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      eventDropAction(active, over);
    }
  }, []);

  /**
   * Handle dragging event
   */
  const handleDragMove = useCallback((event: DragMoveEvent) => {
    const { active, over } = event;
    if (over) {
      eventDragMoveAction(active, over);
    }
  }, []);

  /**
   * Handle dragging event
   */
  const handleDragCancer = useCallback(
    (_event: DragCancelEvent) => {
      dispatch(setActiveCard(null));
    },
    [dispatch]
  );

  const handleChangeColumnDragging = useCallback(
    (_event: SyntheticEvent, _checked: boolean) => {
      dispatch(toggleColumnDragging());
    },
    [dispatch]
  );

  const columnId = useMemo(() => columnList.map(item => item.id), [columnList]);

  const columns = useMemo(() => {
    return (
      <SortableContext items={columnId}>
        {columnList.map(column => {
          const cardData = cardList.find(item => item.columnId === column.id)?.cards;
          return (
            <Box key={column.id} margin={10} width={250}>
              <Column key={column.id} columnData={column} cardList={cardData ?? []} />
            </Box>
          );
        })}
      </SortableContext>
    );
  }, [cardList, columnId, columnList]);

  const overlay = useMemo(() => {
    if (activeCard) {
      return <Card key={activeCard.id} cardData={activeCard} />;
    }
    if (activeColumn) {
      const cardData = cardList.find(item => item.columnId === activeColumn.id);
      return (
        <Column key={activeColumn.id} columnData={activeColumn} cardList={cardData?.cards ?? []} />
      );
    }
  }, [activeCard, activeColumn, cardList]);

  return (
    <Stack spacing={2}>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={isColumnDragging} />}
          onChange={handleChangeColumnDragging}
          label={isColumnDragging ? 'Column dragging enable' : 'Column dragging disable'}
        />
      </FormGroup>

      <DndContext
        sensors={sensors}
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
    </Stack>
  );
};

export default memo(Board);
