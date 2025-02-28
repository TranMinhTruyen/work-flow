import { Column } from 'ag-grid-community';
import { useCallback, useEffect, useState } from 'react';
import { IPageableOrder } from '../model/pageable';

export type CommonProps = {
  _orderList: IPageableOrder[];
  _onSort: (columns?: Column[]) => void;
};

export type UsePageGridTableReturn = {
  commonProps: CommonProps;
  orderList: IPageableOrder[];
  onSort: (columns?: Column[]) => void;
};

const usePageGridTable = (): UsePageGridTableReturn => {
  const [sortColumn, setSortColumn] = useState<Map<string, string>>();
  const [orderList, setOrderList] = useState<IPageableOrder[]>([]);

  useEffect(() => {
    const orderListMap: IPageableOrder[] = [];
    if (sortColumn) {
      for (const [key, value] of sortColumn.entries()) {
        if (value) {
          orderListMap.push({
            orderBy: key,
            direction: value,
          });
        }
      }
      setOrderList(orderListMap);
    }
  }, [sortColumn]);

  const onSort = useCallback((columns?: Column[]) => {
    setSortColumn(prev => {
      const newOrderList = new Map(prev);
      columns?.forEach(item => {
        newOrderList.set(item.getColId(), item.getSort() as string);
      });
      return newOrderList;
    });
  }, []);

  return {
    commonProps: {
      _orderList: orderList,
      _onSort: onSort,
    },
    orderList,
    onSort,
  };
};

export default usePageGridTable;
