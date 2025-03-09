import { Ref, useCallback, useImperativeHandle, useRef, useState } from 'react';

import { ModalRef } from './types/useModalTypes';

const useModal = <T, P = unknown>(ref: Ref<ModalRef<T, P>>) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isAction, setIsAction] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<P | undefined>(undefined);
  const [selectedItem, setSelectedItem] = useState<T | undefined>(undefined);
  const resolveRef = useRef<(value: T | undefined) => void>(undefined);

  /**
   * Use React's useImperativeHandle hook to expose open function to parent components via a ref.
   */
  useImperativeHandle(ref, () => ({
    /**
     * Opens the modal and optionally initializes its state.
     *
     * @param props - Optional properties used to set initial state values for the modal.
     * @returns A promise that resolves with type T or undefined when the modal operation is completed.
     */
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
    selectedItem,
    setSelectedItem,
    handleClose,
    handleDoubleClick,
    handleOk,
  };
};

export default useModal;
