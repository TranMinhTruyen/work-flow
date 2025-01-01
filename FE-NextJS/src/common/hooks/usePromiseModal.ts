/* eslint-disable no-unused-vars */
import { Ref, useCallback, useImperativeHandle, useRef, useState } from 'react';

export type IPromiseModalHandle<T> = {
  open: () => Promise<T | undefined>;
};

const usePromiseModal = <T>(ref: Ref<IPromiseModalHandle<T>>) => {
  const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<T[]>([]);
  const [selectedItem, setSelectedItem] = useState<T | undefined>(undefined);
  const resolveRef = useRef<(value: T | undefined) => void>(undefined);

  useImperativeHandle(ref, () => ({
    open: (): Promise<T | undefined> => {
      setOpen(true);
      return new Promise(resolve => {
        resolveRef.current = resolve;
      });
    },
  }));

  const handleClose = useCallback(() => {
    setOpen(false);
    if (resolveRef.current) {
      resolveRef.current(undefined);
    }
  }, []);

  const handleDoubleClick = useCallback((item?: T) => {
    setOpen(false);
    if (resolveRef.current) {
      resolveRef.current(item);
    }
  }, []);

  const handleOk = useCallback(() => {
    setOpen(false);
    if (resolveRef.current) {
      resolveRef.current(selectedItem);
    }
  }, [selectedItem]);

  return {
    openModal: open,
    items,
    setItems,
    selectedItem,
    setSelectedItem,
    handleClose,
    handleDoubleClick,
    handleOk,
  };
};

export default usePromiseModal;
