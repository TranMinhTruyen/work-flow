import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

type RightDrawerContent = {
  isOnClose: boolean;
  width?: string | number;
  content?: ReactNode;
};

type RightDrawerType = {
  isOpen: boolean;
  content?: RightDrawerContent;
  openDrawer: (content: RightDrawerContent) => void;
  closeDrawer: () => void;
};

const Context = createContext<RightDrawerType>({} as RightDrawerType);

export const useRightDrawer = () => useContext(Context);

const RightDrawerContext = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<RightDrawerContent | undefined>(undefined);

  const openDrawer = useCallback((content: RightDrawerContent) => {
    setIsOpen(true);
    setContent(content);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  return <Context value={{ isOpen, content, openDrawer, closeDrawer }}>{children}</Context>;
};

export default RightDrawerContext;
