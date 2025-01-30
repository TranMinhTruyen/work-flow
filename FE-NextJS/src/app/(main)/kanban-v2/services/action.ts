import store from '@/lib/store';
import { Active, Over } from '@dnd-kit/core/dist/store/types';
import { arrayMove } from '@dnd-kit/sortable';
import lodash from 'lodash';
import { cardData, columnData } from '../data/kanbanData';
import { ICard } from '../model/type';
import { addCard, addColumn, updateCard } from './kanbanSlice';

export const initData = () => {
  store.dispatch(addColumn(columnData));
  for (const column of columnData) {
    const cardList = cardData.filter(item => item.columnId === column.id);
    store.dispatch(addCard({ columnId: column.id, card: cardList }));
  }
};

/**
 * Active when drag over and drop on column.
 *
 * @param active
 * @param over
 * @returns
 */
export const eventDragDropAction = (active: Active, over: Over) => {
  if (!over) return;

  const activeId = active.id as number;
  const overId = over.id as number;

  if (activeId === overId) return;

  const isActiveCard = active.data.current?.type === 'CARD';
  const isOverCard = over.data.current?.type === 'CARD';

  // if drop on card
  if (isActiveCard && isOverCard) {
    // if drop on same column
    if (active.data.current?.columnId === over.data.current?.columnId) {
      if (activeId === overId) {
        return;
      }

      // get list cardData
      const activeCardData = store
        .getState()
        .kanbanState.cardList.find(item => item.columnId === active.data.current?.columnId);

      if (!activeCardData) {
        return;
      }

      const newCardList = lodash.cloneDeep(activeCardData.cards);
      let returnData: ICard[] = [];

      const activeIndex = newCardList.findIndex(i => i.id === activeId); // find index card is dragging
      const overIndex = newCardList.findIndex(i => i.id === overId); // find index card is drop

      if (activeIndex !== -1 && overIndex !== -1) {
        // swap position of card and setting order value
        returnData = arrayMove(newCardList, activeIndex, overIndex).map((card, index) => ({
          ...card,
          order: index,
        }));

        // update store
        store.dispatch(
          updateCard({
            sourceColumnId: active.data.current?.columnId,
            sourceCardList: returnData,
          })
        );
      }
    }
    // if drop on another column
    else {
      // get list cardData active
      const activeCardData = store
        .getState()
        .kanbanState.cardList.find(item => item.columnId === active.data.current?.columnId);

      // get list cardData over
      const overCardData = store
        .getState()
        .kanbanState.cardList.find(item => item.columnId === over.data.current?.columnId);

      if (!activeCardData || !overCardData) {
        return;
      }

      const newActiveCardList = lodash.cloneDeep(activeCardData.cards);
      const newOverCardList = lodash.cloneDeep(overCardData.cards);
      let returnActiveCardList: ICard[] = [];
      let returnOverCardList: ICard[] = [];

      // find index of source and destination
      const activeIndex = newActiveCardList.findIndex(i => i.id === activeId); // find index card is dragging
      const overIndex = newOverCardList.findIndex(i => i.id === overId); // find index card is drop

      if (activeIndex !== -1 && overIndex !== -1) {
        // remove card from source column
        const [removed] = newActiveCardList.splice(activeIndex, 1);

        // change card columnId
        removed.columnId = over.data.current?.columnId;

        // add card to destination column
        newOverCardList.splice(overIndex, 0, removed);

        // setting order source column
        if (newActiveCardList.length > 0) {
          returnActiveCardList = newActiveCardList.map((card, index) => ({
            ...card,
            order: index,
          }));
        }

        // setting order destination column
        if (newOverCardList.length > 0) {
          returnOverCardList = newOverCardList.map((card, index) => ({
            ...card,
            order: index,
          }));
        }

        // update source card store
        store.dispatch(
          updateCard({
            sourceColumnId: active.data.current?.columnId,
            sourceCardList: returnActiveCardList,
            destinationColumnId: over.data.current?.columnId,
            destinationCardList: returnOverCardList,
          })
        );
      }
    }
  }

  // if drop to empty space of column
  if (isActiveCard && !isOverCard) {
    if (active.data.current?.columnId === overId) {
      return;
    }

    // get list cardData active
    const activeCardData = store
      .getState()
      .kanbanState.cardList.find(item => item.columnId === active.data.current?.columnId);

    // get list cardData over
    const overCardData = store
      .getState()
      .kanbanState.cardList.find(item => item.columnId === overId);

    if (!activeCardData || !overCardData) {
      return;
    }

    const newActiveCardList = lodash.cloneDeep(activeCardData.cards); // find index card is dragging
    const newOverCardList = lodash.cloneDeep(overCardData.cards); // find index card is drop
    let returnActiveCardList: ICard[] = [];
    let returnOverCardList: ICard[] = [];

    const activeIndex = newActiveCardList.findIndex(item => item.id === activeId);

    if (activeIndex !== -1) {
      // remove card from source column
      const [removed] = newActiveCardList.splice(activeIndex, 1);

      // change card columnId
      removed.columnId = overId;

      // add card to destination column
      newOverCardList.splice(newOverCardList.length, 0, removed);

      // setting order source column
      if (newActiveCardList.length > 0) {
        returnActiveCardList = newActiveCardList.map((card, index) => ({
          ...card,
          order: index,
        }));
      }

      // setting order destination column
      if (newOverCardList.length > 0) {
        returnOverCardList = newOverCardList.map((card, index) => ({
          ...card,
          order: index,
        }));
      }

      // update source card store
      store.dispatch(
        updateCard({
          sourceColumnId: active.data.current?.columnId,
          sourceCardList: returnActiveCardList,
          destinationColumnId: overId,
          destinationCardList: returnOverCardList,
        })
      );
    }
  }
};

export const eventDragDropMoveAction = (active: Active, over: Over) => {
  if (!over) return;

  const activeId = active.id as number;
  const overId = over.id as number;

  if (activeId === overId) return;

  const isActiveCard = active.data.current?.type === 'CARD';
  const isOverCard = over.data.current?.type === 'CARD';

  // if drop on card
  if (isActiveCard && isOverCard) {
    if (active.data.current?.columnId !== over.data.current?.columnId) {
      // get list cardData active
      const activeCardData = store
        .getState()
        .kanbanState.cardList.find(item => item.columnId === active.data.current?.columnId);

      // get list cardData over
      const overCardData = store
        .getState()
        .kanbanState.cardList.find(item => item.columnId === over.data.current?.columnId);

      if (!activeCardData || !overCardData) {
        return;
      }

      const newActiveCardList = lodash.cloneDeep(activeCardData.cards);
      const newOverCardList = lodash.cloneDeep(overCardData.cards);
      let returnActiveCardList: ICard[] = [];
      let returnOverCardList: ICard[] = [];

      // find index of source and destination
      const activeIndex = newActiveCardList.findIndex(i => i.id === activeId); // find index card is dragging
      const overIndex = newOverCardList.findIndex(i => i.id === overId); // find index card is drop

      if (activeIndex !== -1 && overIndex !== -1) {
        // remove card from source column
        const [removed] = newActiveCardList.splice(activeIndex, 1);

        // change card columnId
        removed.columnId = over.data.current?.columnId;

        // add card to destination column
        newOverCardList.splice(overIndex, 0, removed);

        // setting order source column
        if (newActiveCardList.length > 0) {
          returnActiveCardList = newActiveCardList.map((card, index) => ({
            ...card,
            order: index,
          }));
        }

        // setting order destination column
        if (newOverCardList.length > 0) {
          returnOverCardList = newOverCardList.map((card, index) => ({
            ...card,
            order: index,
          }));
        }

        // update source card store
        store.dispatch(
          updateCard({
            sourceColumnId: active.data.current?.columnId,
            sourceCardList: returnActiveCardList,
            destinationColumnId: over.data.current?.columnId,
            destinationCardList: returnOverCardList,
          })
        );
      }
    }
  }

  // if drop to empty space of column
  if (isActiveCard && !isOverCard) {
    // if drop to empty space in same column
    if (active.data.current?.columnId === overId) {
      // get list cardData
      const activeCardData = store
        .getState()
        .kanbanState.cardList.find(item => item.columnId === active.data.current?.columnId);

      if (!activeCardData) {
        return;
      }

      const newCardList = lodash.cloneDeep(activeCardData.cards);
      let returnData: ICard[] = [];

      const activeIndex = newCardList.findIndex(i => i.id === activeId); // find index card is dragging

      if (activeIndex !== -1) {
        // swap position of card and setting order value
        returnData = arrayMove(newCardList, activeIndex, newCardList.length).map((card, index) => ({
          ...card,
          order: index,
        }));

        // update store
        store.dispatch(
          updateCard({
            sourceColumnId: active.data.current?.columnId,
            sourceCardList: returnData,
          })
        );
      }
    } else {
      // get list cardData active
      const activeCardData = store
        .getState()
        .kanbanState.cardList.find(item => item.columnId === active.data.current?.columnId);

      // get list cardData over
      const overCardData = store
        .getState()
        .kanbanState.cardList.find(item => item.columnId === overId);

      if (!activeCardData || !overCardData) {
        return;
      }

      const newActiveCardList = lodash.cloneDeep(activeCardData.cards); // find index card is dragging
      const newOverCardList = lodash.cloneDeep(overCardData.cards); // find index card is drop
      let returnActiveCardList: ICard[] = [];
      let returnOverCardList: ICard[] = [];

      const activeIndex = newActiveCardList.findIndex(item => item.id === activeId);

      if (activeIndex !== -1) {
        // remove card from source column
        const [removed] = newActiveCardList.splice(activeIndex, 1);

        // change card columnId
        removed.columnId = overId;

        // add card to destination column
        newOverCardList.splice(newOverCardList.length, 0, removed);

        // setting order source column
        if (newActiveCardList.length > 0) {
          returnActiveCardList = newActiveCardList.map((card, index) => ({
            ...card,
            order: index,
          }));
        }

        // setting order destination column
        if (newOverCardList.length > 0) {
          returnOverCardList = newOverCardList.map((card, index) => ({
            ...card,
            order: index,
          }));
        }

        // update source card store
        store.dispatch(
          updateCard({
            sourceColumnId: active.data.current?.columnId,
            sourceCardList: returnActiveCardList,
            destinationColumnId: overId,
            destinationCardList: returnOverCardList,
          })
        );
      }
    }
  }
};
