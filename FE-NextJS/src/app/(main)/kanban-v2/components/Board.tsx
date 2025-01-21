'use client';

import { CURRENT_PATH } from '@/common/constants/commonConst';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { sampleData } from '../data/kanbanData';
import { ICard, IColumn } from '../model/type';
import Card from './Card';
import Column from './Column';

const Board = () => {
  const [data, setData] = useState<IColumn[]>([]);
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
    setData(sampleData);
    sessionStorage.setItem(CURRENT_PATH, path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragStart = useCallback(
    (event: any) => {
      const { active } = event;
      for (const column of data) {
        const card = column.cardList.find(card => card.id === active.id);
        if (card) {
          setActiveCard(card);
          break;
        }
      }
    },
    [data]
  );

  const handleDragCancel = useCallback(() => {
    setActiveCard(null);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) {
        setActiveCard(null);
        return;
      }

      if (active.id === over.id) {
        setActiveCard(null);
        return;
      }

      let sourceColIndex = -1;
      let sourceCardIndex = -1;
      let destColIndex = -1;

      // Tìm vị trí của card được kéo
      for (let i = 0; i < data.length; i++) {
        const cardIndex = data[i].cardList.findIndex(card => card.id === active.id);
        if (cardIndex !== -1) {
          sourceColIndex = i;
          sourceCardIndex = cardIndex;
          break;
        }
      }

      // Tìm vị trí của nơi thả
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === over.id) {
          destColIndex = i;
          break;
        }
      }

      if (sourceColIndex === -1 || destColIndex === -1) {
        setActiveCard(null);
        return;
      }

      const movedCard = data[sourceColIndex].cardList[sourceCardIndex];

      // Xóa card khỏi cột nguồn
      const newSourceCards = [...data[sourceColIndex].cardList];
      newSourceCards.splice(sourceCardIndex, 1);

      // Thêm card vào cột đích
      const newDestCards = [...data[destColIndex].cardList, movedCard];

      const newColumns = [...data];
      newColumns[sourceColIndex] = {
        ...data[sourceColIndex],
        cardList: newSourceCards,
      };
      newColumns[destColIndex] = {
        ...data[destColIndex],
        cardList: newDestCards,
      };

      setData(newColumns);
      setActiveCard(null);
    },
    [data]
  );

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
        {data.map(column => (
          <Box key={column.id} margin={10} width={250}>
            <Column key={column.id} columnData={column} />
          </Box>
        ))}
      </Box>
      {createPortal(<DragOverlay>{overlay}</DragOverlay>, document.body)}
    </DndContext>
  );
};

export default memo(Board);
