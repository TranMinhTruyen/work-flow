import { GridApi } from 'ag-grid-community';
import { RefObject } from 'react';

import { IPageableOrder, IPageResponse } from '@/common/model/Pageable';

export type Pageable = {
  page: number;
  size: number;
  orderList?: IPageableOrder[];
};

export type PaginationInfo = {
  from?: number;
  to?: number;
  total?: number;
  totalPages?: number;
};

export type ControlProps<T = any> = {
  /**
   * Show or hide the loading overlay.
   */
  loading: boolean;

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
   * This object represents the pagination details.
   *
   * Properties:
   * - from: The starting index of the current page.
   * - to: The ending index of the current page.
   * - total: The total number of records available.
   * - totalPages: The total number of pages available.
   */
  paginationInfo?: PaginationInfo;

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
  onDataChange: (data: T[], pageResponse?: IPageResponse) => void;

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
};

export type UseTableProps<T> = {
  defaultValues?: {
    data?: T[];
    page?: number;
    size?: number;
    orderList?: IPageableOrder[];
  };
};

export type UseTableReturn<T = any> = Omit<
  ControlProps<T>,
  'data' | 'paginationInfo' | 'loading'
> & {
  control: ControlProps<T>;
  onSetLoading: (loading: boolean) => void;
};
