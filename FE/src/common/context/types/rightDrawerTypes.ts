import { createContext, ReactNode, useContext } from 'react';

export type RightDrawerContent = {
  isOnClose: boolean;
  width?: string | number;
  title?: string;
  content?: ReactNode;
  onCloseAction?: () => void;
};

export type RightDrawerType = {
  isOpen: boolean;
  content?: RightDrawerContent;
  openDrawer: (content: RightDrawerContent) => void;
  closeDrawer: (triggerCloseAction?: boolean) => void;
};

export const Context = createContext<RightDrawerType>({} as RightDrawerType);

export const useRightDrawer = () => useContext(Context);
