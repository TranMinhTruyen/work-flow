import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SortIcon from '@mui/icons-material/Sort';
import { SortDirection, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/system';
import type { CustomHeaderProps } from 'ag-grid-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

const CustomHeader = (props: CustomHeaderProps) => {
  const [ascSort, setAscSort] = useState<SortDirection>(false);
  const [descSort, setDescSort] = useState<SortDirection>(false);

  useEffect(() => {
    const order = props.column.getSort();
    setAscSort(order === 'asc' ? 'asc' : false);
    setDescSort(order === 'desc' ? 'desc' : false);
  }, [props.column]);

  const onSortRequested = useCallback(
    (order: 'asc' | 'desc' | null) => (event: any) => {
      props.setSort(order, event.shiftKey);
      setAscSort(order === 'asc' ? 'asc' : false);
      setDescSort(order === 'desc' ? 'desc' : false);
    },
    [props]
  );

  const sortButton = useMemo(() => {
    if (props.column.isSortable()) {
      if (ascSort) {
        return (
          <IconButton onClick={onSortRequested('desc')}>
            <KeyboardArrowUpIcon />
          </IconButton>
        );
      }
      if (descSort) {
        return (
          <IconButton onClick={onSortRequested(null)}>
            <KeyboardArrowDownIcon />
          </IconButton>
        );
      }
      return (
        <IconButton onClick={onSortRequested('asc')}>
          <SortIcon fontSize={'small'} />
        </IconButton>
      );
    }
  }, [ascSort, descSort, onSortRequested, props.column]);

  return (
    <Stack direction={'row'} sx={{ width: '100%' }}>
      <Typography sx={{ fontWeight: 'bold' }}>{props.displayName}</Typography>
      <Stack sx={{ marginLeft: 'auto' }}>{sortButton}</Stack>
    </Stack>
  );
};

export default CustomHeader;
