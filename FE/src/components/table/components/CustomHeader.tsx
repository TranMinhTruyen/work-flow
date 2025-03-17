import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SortIcon from '@mui/icons-material/Sort';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/system';
import type { CustomHeaderProps as AgCustomHeaderProps } from 'ag-grid-react';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { ControlProps } from '@/common/hooks/types/useTableTypes';
import { capitalizeFirst } from '@/common/utils/stringUtil';

export type CustomHeaderProps = AgCustomHeaderProps & {
  control?: ControlProps;
};

const CustomHeader = (props: CustomHeaderProps) => {
  const { control, column, displayName } = props;
  const [ascSort, setAscSort] = useState<'asc' | null>(null);
  const [descSort, setDescSort] = useState<'desc' | null>(null);

  useEffect(() => {
    const order = column.getSort();
    setAscSort(order === 'asc' ? 'asc' : null);
    setDescSort(order === 'desc' ? 'desc' : null);
  }, [column]);

  const onSortRequested = useCallback(
    (order: 'asc' | 'desc' | null) => (_event: any) => {
      setAscSort(order === 'asc' ? 'asc' : null);
      setDescSort(order === 'desc' ? 'desc' : null);
      control?.onSort(column.getColId(), order);
    },
    [control, column]
  );

  const sortable = useMemo(() => {
    if (column.isSortable()) {
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
          id={`headerSort${capitalizeFirst(column.getColId())}`}
          sx={{ marginLeft: 'auto' }}
        >
          {sortButton}
        </Stack>
      );
    }
  }, [ascSort, column, descSort, onSortRequested]);

  return (
    <Stack direction={'row'} sx={{ width: '100%' }}>
      <Stack
        direction={'row'}
        id={`headerTitle${capitalizeFirst(column.getColId())}`}
        flex={!column.isSortable() ? 1 : 0}
      >
        <Typography sx={{ fontWeight: 'bold' }}>{displayName}</Typography>
      </Stack>
      {sortable}
    </Stack>
  );
};

export default CustomHeader;
