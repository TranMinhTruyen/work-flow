/* eslint-disable no-unused-vars */
import { Ref, useCallback, useImperativeHandle, useRef, useState } from 'react';

export interface IPromiseModalHandle<T> {
  open: () => Promise<T | undefined | null>;
}

const usePromiseModal = <T>(ref: Ref<IPromiseModalHandle<T>>) => {
  const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<T[]>([]);
  const [selectedItem, setSelectedItem] = useState<T | undefined | null>();
  const resolveRef = useRef<(value: T | undefined | null) => void>(null);

  useImperativeHandle(ref, () => ({
    open: (): Promise<T | undefined | null> => {
      setOpen(true);
      setSelectedItem(null);
      return new Promise(resolve => {
        resolveRef.current = resolve;
      });
    },
  }));

  const handleClose = useCallback(() => {
    setOpen(false);
    if (resolveRef.current) {
      resolveRef.current(null);
    }
  }, []);

  const handleDoubleClick = useCallback((item: T) => {
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
