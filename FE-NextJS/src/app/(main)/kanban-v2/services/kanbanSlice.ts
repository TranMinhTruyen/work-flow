import { RootState } from '@/lib/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard, IColumn, IData } from '../model/type';

type BoardSlice = {
  columnList: IColumn[];
  cardList: IData[];
  activeCard?: ICard | null;
};

const initialState: BoardSlice = {
  columnList: [],
  cardList: [],
};

const kanbanSlice = createSlice({
  name: 'kanbanState',
  initialState,
  reducers: {
    addColumn: (state, action: PayloadAction<IColumn | IColumn[]>) => {
      const { payload } = action;
      if (Array.isArray(payload)) {
        const newColumn = payload.filter(
          newColumn => !state.columnList.some(existingColumn => existingColumn.id === newColumn.id)
        );
        state.columnList.push(...newColumn);
      } else {
        const isColumnExist = state.columnList.some(
          existingColumn => existingColumn.id === payload.id
        );
        if (!isColumnExist) {
          state.columnList.push(payload);
        }
      }
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
    updateCard: (
      state,
      action: PayloadAction<{
        sourceColumnId?: number;
        sourceCardList?: ICard[];
        destinationColumnId?: number;
        destinationCardList?: ICard[];
      }>
    ) => {
      const { sourceColumnId, sourceCardList, destinationColumnId, destinationCardList } =
        action.payload;
      let cardList;
      if (sourceColumnId && sourceCardList) {
        cardList = state.cardList.find(item => item.columnId === sourceColumnId);
        if (cardList) {
          cardList.cards = sourceCardList;
        }
      }
      if (destinationColumnId && destinationCardList) {
        cardList = state.cardList.find(item => item.columnId === destinationColumnId);
        if (cardList) {
          cardList.cards = destinationCardList;
        }
      }
    },
    setActiveCard: (state, action: PayloadAction<ICard | null>) => {
      const { payload } = action;
      state.activeCard = payload;
    },
  },
});

export const { addColumn, addCard, updateCard, setActiveCard } = kanbanSlice.actions;

export const selectColumnList = (state: RootState) => state.kanbanState.columnList;
export const selectCardsByColumnId = (columnId: number) => (state: RootState) =>
  state.kanbanState.cardList.find(item => item.columnId === columnId)?.cards;
export const selectActiveCard = (state: RootState) => state.kanbanState.activeCard;
export const selectCardList = (state: RootState) => state.kanbanState.cardList;

export default kanbanSlice.reducer;
