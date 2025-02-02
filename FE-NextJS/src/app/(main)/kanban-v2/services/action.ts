import { Type } from '@/common/enums/BoardEnum';
import store from '@/lib/store';
import { Active, Over } from '@dnd-kit/core/dist/store/types';
import { arrayMove } from '@dnd-kit/sortable';
import lodash from 'lodash';
import { cardData, columnData } from '../data/kanbanData';
import { ICard, IColumn } from '../model/type';
import { addCard, addColumn, updateCard, UpdateCardPayload, updateColumn } from './kanbanSlice';

//#region Helper Types
type CardMoveContext = {
  activeId: number;
  overId: number;
  activeColumnId: number;
  overColumnId: number;
  activeCardIndex: number;
  overCardIndex: number;
};
//#endregion

export const initData = () => {
  store.dispatch(addColumn(columnData));
  for (const column of columnData) {
    const cardList = cardData.filter(item => item.columnId === column.id);
    store.dispatch(addCard({ columnId: column.id, card: cardList }));
  }
};

//#region Common Helpers
const getCardList = (columnId: number) =>
  store.getState().kanbanState.cardList.find(c => c.columnId === columnId);

const updateCardsInStore = (
  sourceColumnId: number,
  sourceCards: ICard[],
  destinationColumnId?: number,
  destinationCards?: ICard[]
) => {
  let updates: UpdateCardPayload = {
    sourceColumnId: sourceColumnId,
    sourceCardList: sourceCards,
  };
  if (destinationColumnId && destinationCards) {
    updates = {
      ...updates,
      destinationColumnId: destinationColumnId,
      destinationCardList: destinationCards,
    };
  }
  store.dispatch(updateCard(updates));
};

const normalizeColumnOrder = (items: IColumn[]) =>
  items.map((item, index) => ({ ...item, order: index }));

const normalizeCardOrder = (items: ICard[]) =>
  items.map((item, index) => ({ ...item, order: index }));
//#endregion

//#region Card Helpers
const getCardMoveContext = (active: Active, over: Over): CardMoveContext | null => {
  const activeId = Number(active.id);
  const overId = Number(over.id);
  const activeColumnId = active.data.current?.columnId;
  const overColumnId =
    over.data.current?.type === Type.CARD ? over.data.current.columnId : Number(over.id);

  if (!activeColumnId || !overColumnId) return null;

  const activeCardList = getCardList(activeColumnId)?.cards || [];
  const overCardList = getCardList(overColumnId)?.cards || [];

  return {
    activeId,
    overId,
    activeColumnId,
    overColumnId,
    activeCardIndex: activeCardList.findIndex(c => c.id === activeId),
    overCardIndex: overCardList.findIndex(c => c.id === overId),
  };
};
//#endregion

/**
 * Active when drag over and drop on column.
 *
 * @param active
 * @param over
 * @returns
 */
export const eventDropAction = (active: Active, over: Over | null) => {
  if (!over) return;

  // Handle Column Drag
  if (active.data.current?.type === Type.COLUMN) {
    const columns = lodash.cloneDeep(store.getState().kanbanState.columnList);

    const oldIndex = columns.findIndex(c => c.id === Number(active.id));
    const newIndex = columns.findIndex(c => c.id === Number(over.id));

    if (oldIndex !== -1 && newIndex !== -1) {
      const newColumns = normalizeColumnOrder(arrayMove(columns, oldIndex, newIndex));
      store.dispatch(updateColumn(newColumns));
    }
    return;
  }
  // Handle Card Drag
  else {
    const context = getCardMoveContext(active, over);

    if (!context) return;

    const { activeColumnId, activeCardIndex, overCardIndex } = context;

    const cardList = lodash.cloneDeep(getCardList(activeColumnId)?.cards || []);

    if (activeCardIndex === -1 || overCardIndex === -1) return;

    const newCards = normalizeCardOrder(arrayMove(cardList, activeCardIndex, overCardIndex));
    updateCardsInStore(activeColumnId, newCards);
    return;
  }
};

/**
 * Active when drag over.
 *
 * @param active
 * @param over
 * @returns
 */
export const eventDragMoveAction = (active: Active, over: Over) => {
  if (!over) return;

  const context = getCardMoveContext(active, over);

  if (!context) return;

  const { activeId, overId, activeColumnId, overColumnId } = context;

  if (activeId === overId) return;

  const isActiveCard = active.data.current?.type === Type.CARD;
  const isOverCard = over.data.current?.type === Type.CARD;

  // if drop on card
  if (isActiveCard && isOverCard && activeColumnId !== overColumnId) {
    // get list cardData active
    const activeCardData = getCardList(activeColumnId);

    // get list cardData over
    const overCardData = getCardList(overColumnId);

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
        returnActiveCardList = normalizeCardOrder(newActiveCardList);
      }

      // setting order destination column
      if (newOverCardList.length > 0) {
        returnOverCardList = normalizeCardOrder(newOverCardList);
      }

      // update source card store
      updateCardsInStore(
        active.data.current?.columnId,
        returnActiveCardList,
        over.data.current?.columnId,
        returnOverCardList
      );
    }
  }

  // if drop to empty space of column
  if (isActiveCard && !isOverCard) {
    // if drop to empty space in same column
    if (activeColumnId === overColumnId) {
      // get list cardData
      const activeCardData = getCardList(activeColumnId);

      if (!activeCardData) {
        return;
      }

      const newCardList = lodash.cloneDeep(activeCardData.cards);
      let returnActiveCardList: ICard[] = [];

      const activeIndex = newCardList.findIndex(i => i.id === activeId); // find index card is dragging

      if (activeIndex !== -1) {
        // swap position of card and setting order value
        returnActiveCardList = normalizeCardOrder(
          arrayMove(newCardList, activeIndex, newCardList.length)
        );

        // update store
        updateCardsInStore(activeColumnId, returnActiveCardList);
      }
    } else {
      // get list cardData active
      const activeCardData = getCardList(activeColumnId);

      // get list cardData over
      const overCardData = getCardList(overColumnId);

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
          returnActiveCardList = normalizeCardOrder(newActiveCardList);
        }

        // setting order destination column
        if (newOverCardList.length > 0) {
          returnOverCardList = normalizeCardOrder(newOverCardList);
        }

        // update source card store
        updateCardsInStore(activeColumnId, returnActiveCardList, overColumnId, returnOverCardList);
      }
    }
  }
};
