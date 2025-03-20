import { ReactNode, useCallback, useState } from 'react';

import { Context, RightDrawerContent } from './types/rightDrawerTypes';

const RightDrawerContext = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<RightDrawerContent | undefined>(undefined);

  const openDrawer = useCallback((content: RightDrawerContent) => {
    setIsOpen(true);
    setContent(content);
  }, []);

  const closeDrawer = useCallback(() => {
    if (content?.onCloseAction) {
      content.onCloseAction();
    }
    setIsOpen(false);
  }, [content]);

  return <Context value={{ isOpen, content, openDrawer, closeDrawer }}>{children}</Context>;
};

export default RightDrawerContext;
