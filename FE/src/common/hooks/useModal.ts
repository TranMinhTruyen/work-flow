import { SelectionChangedEvent } from 'ag-grid-community';
import { Ref, useCallback, useImperativeHandle, useRef, useState } from 'react';

import { ModalRef, ModalReturn } from './types/useModalTypes';

const useModal = <T, P = unknown>(ref: Ref<ModalRef<T, P>>) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isAction, setIsAction] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<P | undefined>(undefined);
  const [selectedItem, setSelectedItem] = useState<T[] | undefined>(undefined);
  const resolveRef = useRef<(value: ModalReturn<T>) => void>(undefined);

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
    open: (props): Promise<ModalReturn<T>> => {
      if (props && props.inputValue) {
        setInputValue(props.inputValue);
      }

      if (props && props.isAction) {
        setIsAction(props.isAction);
      }

      setOpen(true);
      setSelectedItem([]);

      return new Promise(resolve => {
        resolveRef.current = resolve;
      });
    },
  }));

  /**
   * Closes the dialog without returning any value to the caller.
   *
   * - Sets the dialog's `open` state to `false`.
   * - Resolves the promise (if any) with `undefined`, indicating
   *   that the user dismissed the dialog without making a selection.
   */
  const handleClose = useCallback(() => {
    setOpen(false);
    if (resolveRef.current) {
      resolveRef.current({ value: [], status: 'CANCEL' });
    }
  }, []);

  /**
   * Handles a double-click action on a row / item in the grid.
   *
   * - Closes the dialog.
   * - Immediately resolves the promise with the item(s) that was
   *   double-clicked, allowing the caller to process the selection
   *   without having to click “OK”.
   *
   * @param item Optional array of items of generic type `T` that were double-clicked.
   */
  const handleDoubleClick = useCallback((item?: T) => {
    setOpen(false);
    if (resolveRef.current) {
      resolveRef.current({ value: item ? [item] : [], status: 'OK' });
    }
  }, []);

  /**
   * Confirms the current selection and closes the dialog.
   *
   * - Retrieves the value stored in `selectedItem` (captured in the
   *   dependency array).
   * - Closes the dialog and resolves the promise with the selected item(s),
   *   signalling a successful selection to the caller.
   */
  const handleOk = useCallback(() => {
    setOpen(false);
    if (resolveRef.current) {
      resolveRef.current({ value: selectedItem ?? [], status: 'OK' });
    }
  }, [selectedItem]);

  /**
   * AG-Grid `onSelectionChanged` handler.
   *
   * - Reads the nodes that are currently selected in the grid.
   * - Extracts their data objects and stores them in `selectedItem`
   *   (state setter) so the dialog knows what the user has chosen.
   *
   * @param event AG-Grid `SelectionChangedEvent` containing grid API
   *              and selection metadata.
   */
  const onSelectionChanged = useCallback(
    (event: SelectionChangedEvent) => {
      const selectedNodes = event.api.getSelectedNodes();
      const selectedData: T[] = [];
      if (selectedNodes.length > 0) {
        for (let i = 0; i < selectedNodes.length; i++) {
          selectedData.push(selectedNodes[i].data);
        }
        setSelectedItem(selectedData);
      }
    },
    [setSelectedItem]
  );

  return {
    inputValue,
    isAction,
    openModal: open,
    selectedItem,
    onSelectionChanged,
    handleClose,
    handleDoubleClick,
    handleOk,
  };
};

export default useModal;
