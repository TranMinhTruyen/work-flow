import { Type } from '@/common/enums/BoardEnum';
import store from '@/lib/store';
import { Active, Over } from '@dnd-kit/core/dist/store/types';
import { arrayMove } from '@dnd-kit/sortable';
import lodash from 'lodash';
import { cardData, columnData } from '../data/kanbanData';
import { CardMoveContext, ICard, IColumn, UpdateCardPayload } from '../model/type';
import {
  addCard,
  addColumn,
  setActiveCard,
  setActiveColumn,
  updateCard,
  updateColumn,
} from './kanbanSlice';

export const initData = () => {
  store.dispatch(addColumn(columnData));
  for (const column of columnData) {
    const cardList = cardData.filter(item => item.columnId === column.id);
    store.dispatch(addCard({ columnId: column.id, card: cardList }));
  }
};

//#region Common Helpers
const getCardList = (columnId: number) => {
  return store.getState().kanbanState.cardList.find(c => c.columnId === columnId);
};

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
const getDnDContext = (active: Active, over: Over): CardMoveContext | null => {
  const activeCardId = Number(active.id);
  const overCardId = Number(over.id);
  const activeColumnId =
    active.data.current?.type === Type.CARD ? active.data.current.columnId : Number(active.id);
  const overColumnId =
    over.data.current?.type === Type.CARD ? over.data.current.columnId : Number(over.id);

  const activeCardList = lodash.cloneDeep(getCardList(activeColumnId)?.cards || []);
  const overCardList = lodash.cloneDeep(getCardList(overColumnId)?.cards || []);

  const columnList = store.getState().kanbanState.columnList;

  return {
    activeCardId,
    overCardId,
    activeColumnId,
    overColumnId,
    activeColumnIndex: columnList.findIndex(c => c.id === activeColumnId),
    overColumnIndex: columnList.findIndex(c => c.id === overColumnId),
    activeCardIndex: activeCardList.findIndex(c => c.id === activeCardId),
    overCardIndex: overCardList.findIndex(c => c.id === overCardId),
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
  store.dispatch(setActiveCard(null));
  store.dispatch(setActiveColumn(null));

  if (!over) return;

  const context = getDnDContext(active, over);

  if (!context) return;

  const { activeColumnId, activeColumnIndex, overColumnIndex, activeCardIndex, overCardIndex } =
    context;

  // Handle Column Drag
  if (active.data.current?.type === Type.COLUMN) {
    if (activeColumnIndex === overColumnIndex) return;

    const columns = lodash.cloneDeep(store.getState().kanbanState.columnList);

    if (activeColumnIndex !== -1 && overColumnIndex !== -1) {
      const newColumns = normalizeColumnOrder(
        arrayMove(columns, activeColumnIndex, overColumnIndex)
      );
      store.dispatch(updateColumn(newColumns));
    }
    return;
  }
  // Handle Card Drag
  else {
    if (activeCardIndex === overCardIndex) return;

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

  const context = getDnDContext(active, over);

  if (!context) return;

  const {
    activeCardId: activeId,
    overCardId: overId,
    activeColumnId,
    overColumnId,
    activeCardIndex,
    overCardIndex,
  } = context;

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

    if (activeCardIndex !== -1 && overCardIndex !== -1) {
      // remove card from source column
      const [removed] = newActiveCardList.splice(activeCardIndex, 1);

      // change card columnId
      removed.columnId = over.data.current?.columnId;

      // add card to destination column
      newOverCardList.splice(overCardIndex, 0, removed);

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

      if (activeCardIndex !== -1) {
        // swap position of card and setting order value
        returnActiveCardList = normalizeCardOrder(
          arrayMove(newCardList, activeCardIndex, newCardList.length)
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

      const newActiveCardList = lodash.cloneDeep(activeCardData.cards);
      const newOverCardList = lodash.cloneDeep(overCardData.cards);
      let returnActiveCardList: ICard[] = [];
      let returnOverCardList: ICard[] = [];

      if (activeCardIndex !== -1) {
        // remove card from source column
        const [removed] = newActiveCardList.splice(activeCardIndex, 1);

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
