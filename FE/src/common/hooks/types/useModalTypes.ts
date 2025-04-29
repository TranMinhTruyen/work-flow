/**
 * This type defines the properties required to open a modal.
 * - inputValue (optional): The value that may be used as the input for the modal.
 * - isAction (optional): A flag indicating whether the modal action should be executed.
 */
export type OpenModalProps<P> = {
  inputValue?: P;
  isAction?: boolean;
};

/**
 * This type defines a reference for a modal that works with promises.
 * It includes an open function that takes optional modal properties and returns a Promise.
 * - T is the type of the resolved value from the modal.
 * - P (optional) is the type for input properties used to open the modal.
 */
export type ModalRef<T, P = unknown> = {
  open: (props?: OpenModalProps<P>) => Promise<ModalReturn<T>>;
};

export type ModalReturn<T> = {
  value: T[];
  status: 'OK' | 'CANCEL';
};
