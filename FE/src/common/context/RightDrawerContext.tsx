import { ReactNode, useCallback, useState } from 'react';

import { useAppSelector } from '@/lib/store';

import { selectIsLogin } from '../store/commonSlice';
import { Context, RightDrawerContent } from './types/rightDrawerTypes';

const RightDrawerContext = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<RightDrawerContent | undefined>(undefined);
  const isLogin = useAppSelector(selectIsLogin);

  const openDrawer = useCallback((content: RightDrawerContent) => {
    setIsOpen(true);
    setContent(content);
  }, []);

  const closeDrawer = useCallback(
    (triggerCloseAction: boolean = true) => {
      if (isLogin && triggerCloseAction && content?.onCloseAction) {
        content.onCloseAction();
      }
      setIsOpen(false);
    },
    [content, isLogin]
  );

  return <Context value={{ isOpen, content, openDrawer, closeDrawer }}>{children}</Context>;
};

export default RightDrawerContext;
