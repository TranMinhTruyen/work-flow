import { createContext, ReactNode, useContext } from 'react';

export type RightDrawerContent = {
  isOnClose: boolean;
  width?: string | number;
  content?: ReactNode;
};

export type RightDrawerType = {
  isOpen: boolean;
  content?: RightDrawerContent;
  openDrawer: (content: RightDrawerContent) => void;
  closeDrawer: () => void;
};

export const Context = createContext<RightDrawerType>({} as RightDrawerType);

export const useRightDrawer = () => useContext(Context);
