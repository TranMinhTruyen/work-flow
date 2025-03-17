import { GridApi } from 'ag-grid-community';
import { RefObject } from 'react';

import { IPageableOrder } from '@/common/model/pageable';

export type Pageable = {
  page: number;
  size: number;
  orderList?: IPageableOrder[];
};

export type ControlProps<T = any> = {
  /**
   * Table data array.
   * Represents the current set of rows displayed in the table.
   */
  data?: T[];

  /**
   * Optional pagination settings. This property holds pagination configuration details.
   * (such as current page, page size, etc.) if pagination is applied.
   */
  pageable: Pageable;

  /**
   * A React ref object that holds a reference to the Grid API.
   *
   * This ref is used to interact with the grid component's API,
   * allowing for programmatic access to grid methods and properties.
   * It will be either an instance of GridApi (when initialized) or null.
   */
  gridApiRef: RefObject<GridApi<T> | null>;

  /**
   * Callback triggered when the table data is updated.
   *
   * @param data - The new set of table data.
   */
  onDataChange: (data: T[]) => void;

  /**
   * Callback triggered when a column's sort order is changed.
   *
   * @param columnId - The identifier of the sorted column.
   * @param order - The sort order: 'asc' for ascending, 'desc' for descending, or null for no sorting.
   */
  onSort: (columnId: string, order: 'asc' | 'desc' | null) => void;

  /**
   * Callback triggered when the page number is changed.
   *
   * @param page - The new page number.
   */
  onPageChange: (page: number) => void;

  /**
   * Callback triggered when the page size (number of rows per page) is changed.
   *
   * @param size - The new page size.
   */
  onSizeChange: (size: number) => void;

  /**
   * Callback triggered when any pageable parameter (page, size, etc.) is updated.
   *
   * @param pageable - The new pageable configuration.
   */
  onPageableChange: (pageable: Pageable) => void;
};

export type UseTableProps<T> = {
  defaultValues?: {
    data?: T[];
    page?: number;
    size?: number;
    orderList?: IPageableOrder[];
  };
};

export type UseTableReturn<T = any> = ControlProps<T> & {
  control: ControlProps<T>;
};
