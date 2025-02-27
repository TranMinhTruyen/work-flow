import { Column } from 'ag-grid-community';
import { useCallback, useEffect, useState } from 'react';
import { IPageableOrder } from '../model/Pageable';

const usePageGridTable = () => {
  const [orderList, setOrderList] = useState<Map<string, string>>();
  const [sortList, setSortList] = useState<IPageableOrder[]>([]);

  useEffect(() => {
    const orderListMap: IPageableOrder[] = [];
    if (orderList) {
      for (const [key, value] of orderList.entries()) {
        if (value) {
          orderListMap.push({
            orderBy: key,
            direction: value,
          });
        }
      }
      setSortList(orderListMap);
    }
  }, [orderList]);

  const onSort = useCallback((columns?: Column[]) => {
    const newOrderList = new Map(orderList);
    columns?.forEach(item => {
      newOrderList.set(item.getColId(), item.getSort() as string);
    });
    setOrderList(newOrderList);
  }, []);

  return {
    sortList,
    onSort,
  };
};

export default usePageGridTable;
