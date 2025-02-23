import { Ref, useCallback, useImperativeHandle, useRef, useState } from 'react';

type OpenModalProps<P> = {
  inputValue?: P;
  isAction?: boolean;
};

/**
 * T = return type when modal close.
 * P = inputValue type when open modal.
 */
export type PromiseModalRef<T, P = unknown> = {
  open: (props?: OpenModalProps<P>) => Promise<T | undefined>;
};

const usePromiseModal = <T, P = unknown>(ref: Ref<PromiseModalRef<T, P>>) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isAction, setIsAction] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<P | undefined>(undefined);
  const [items, setItems] = useState<T[]>([]);
  const [selectedItem, setSelectedItem] = useState<T | undefined>(undefined);
  const resolveRef = useRef<(value: T | undefined) => void>(undefined);

  useImperativeHandle(ref, () => ({
    open: (props): Promise<T | undefined> => {
      if (props && props.inputValue) {
        setInputValue(props.inputValue);
      }

      if (props && props.isAction) {
        setIsAction(props.isAction);
      }

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
    inputValue,
    isAction,
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
