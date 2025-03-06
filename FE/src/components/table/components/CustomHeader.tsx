import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SortIcon from '@mui/icons-material/Sort';
import { SortDirection, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/system';
import type { CustomHeaderProps as AgCustomHeaderProps } from 'ag-grid-react';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { ControlProps } from '@/common/hooks/useTable';
import { capitalizeFirst } from '@/common/utils/stringUtil';

export type CustomHeaderProps = AgCustomHeaderProps & {
  control?: ControlProps;
};

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
      setAscSort(order === 'asc' ? 'asc' : false);
      setDescSort(order === 'desc' ? 'desc' : false);
      props.control?.onSort(props.column.getColId(), order);
    },
    [props]
  );

  const sortable = useMemo(() => {
    if (props.column.isSortable()) {
      let sortButton: ReactNode = null;
      if (ascSort) {
        sortButton = (
          <IconButton onClick={onSortRequested('desc')}>
            <KeyboardArrowUpIcon />
          </IconButton>
        );
      }
      if (descSort) {
        sortButton = (
          <IconButton onClick={onSortRequested(null)}>
            <KeyboardArrowDownIcon />
          </IconButton>
        );
      }
      if (!ascSort && !descSort) {
        sortButton = (
          <IconButton onClick={onSortRequested('asc')}>
            <SortIcon fontSize={'small'} />
          </IconButton>
        );
      }

      return (
        <Stack
          direction={'row'}
          id={`headerSort${capitalizeFirst(props.column.getColId())}`}
          sx={{ marginLeft: 'auto' }}
        >
          {sortButton}
        </Stack>
      );
    }
  }, [ascSort, descSort, onSortRequested, props.column]);

  return (
    <Stack direction={'row'} sx={{ width: '100%' }}>
      <Stack
        direction={'row'}
        id={`headerTitle${capitalizeFirst(props.column.getColId())}`}
        flex={!props.column.isSortable() ? 1 : 0}
      >
        <Typography sx={{ fontWeight: 'bold' }}>{props.displayName}</Typography>
      </Stack>
      {sortable}
    </Stack>
  );
};

export default CustomHeader;
