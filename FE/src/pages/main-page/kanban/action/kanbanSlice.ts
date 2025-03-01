import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/lib/store';

import { ICard, IColumn, IData, UpdateCardPayload } from '../model/type';

type BoardSlice = {
  columnList: IColumn[];
  cardList: IData[];
  activeCard?: ICard | null;
  activeColumn?: IColumn | null;
  isColumnDragging: boolean;
};

const initialState: BoardSlice = {
  columnList: [],
  cardList: [],
  isColumnDragging: true,
};

const kanbanSlice = createSlice({
  name: 'kanbanState',
  initialState,
  reducers: {
    addColumn: (state, action: PayloadAction<IColumn | IColumn[]>) => {
      const { payload } = action;

      const columnList = state.columnList;

      if (Array.isArray(payload)) {
        const newColumn = payload.filter(
          newColumn => !columnList.some(existingColumn => existingColumn.id === newColumn.id)
        );
        columnList.push(...newColumn);
      } else {
        const isColumnExist = columnList.some(existingColumn => existingColumn.id === payload.id);
        if (!isColumnExist) {
          columnList.push(payload);
        }
      }

      columnList.sort((a, b) => a.order - b.order);
    },
    addCard: (state, action: PayloadAction<{ columnId: number; card: ICard | ICard[] }>) => {
      const { columnId, card } = action.payload;
      const cardList = state.cardList.find(item => item.columnId === columnId);
      if (cardList) {
        if (Array.isArray(card)) {
          const newCards = card.filter(
            newCard => !cardList.cards.some(existingCard => existingCard.id === newCard.id)
          );
          cardList.cards.push(...newCards);
        } else {
          const isCardExist = cardList.cards.some(existingCard => existingCard.id === card.id);
          if (!isCardExist) {
            cardList.cards.push(card);
          }
        }

        cardList.cards.sort((a, b) => a.order - b.order);
      } else {
        const newCardList: IData = {
          columnId: columnId,
          cards: [],
        };

        if (Array.isArray(card)) {
          const newCards = card.filter(
            newCard => !newCardList.cards.some(existingCard => existingCard.id === newCard.id)
          );
          newCardList.cards.push(...newCards);
        } else {
          const isCardExist = newCardList.cards.some(existingCard => existingCard.id === card.id);
          if (!isCardExist) {
            newCardList.cards.push(card);
          }
        }

        newCardList.cards.sort((a, b) => a.order - b.order);

        state.cardList.push(newCardList);
      }
    },
    updateCard: (state, action: PayloadAction<UpdateCardPayload>) => {
      const { sourceColumnId, sourceCardList, destinationColumnId, destinationCardList } =
        action.payload;
      let cardList;
      if (sourceColumnId && sourceCardList) {
        cardList = state.cardList.find(item => item.columnId === sourceColumnId);
        if (cardList) {
          cardList.cards = sourceCardList;
          cardList.cards.sort((a, b) => a.order - b.order);
        }
      }
      if (destinationColumnId && destinationCardList) {
        cardList = state.cardList.find(item => item.columnId === destinationColumnId);
        if (cardList) {
          cardList.cards = destinationCardList;
          cardList.cards.sort((a, b) => a.order - b.order);
        }
      }
    },
    updateColumn: (state, action: PayloadAction<IColumn[] | null>) => {
      const { payload } = action;
      if (payload) {
        state.columnList = payload;
        state.columnList.sort((a, b) => a.order - b.order);
      }
    },
    setActiveColumn: (state, action: PayloadAction<IColumn | null>) => {
      const { payload } = action;
      state.activeColumn = payload;
    },
    setActiveCard: (state, action: PayloadAction<ICard | null>) => {
      const { payload } = action;
      state.activeCard = payload;
    },
    toggleColumnDragging: state => {
      state.isColumnDragging = !state.isColumnDragging;
    },
  },
});

export const {
  addColumn,
  addCard,
  updateCard,
  updateColumn,
  setActiveColumn,
  setActiveCard,
  toggleColumnDragging,
} = kanbanSlice.actions;

export const selectColumnList = (state: RootState) => state.kanbanState.columnList;
export const selectCardsByColumnId = (columnId: number) => (state: RootState) =>
  state.kanbanState.cardList.find(item => item.columnId === columnId)?.cards;
export const selectCardList = (state: RootState) => state.kanbanState.cardList;
export const selectActiveColumn = (state: RootState) => state.kanbanState.activeColumn;
export const selectActiveCard = (state: RootState) => state.kanbanState.activeCard;
export const selectIsColumnDragging = (state: RootState) => state.kanbanState.isColumnDragging;

export default kanbanSlice.reducer;
