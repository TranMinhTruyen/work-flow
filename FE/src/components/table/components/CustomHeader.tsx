import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SortIcon from '@mui/icons-material/Sort';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import type { CustomHeaderProps as AgCustomHeaderProps } from 'ag-grid-react';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { ControlProps } from '@/common/hooks/types/useTableTypes';
import { capitalizeFirst } from '@/common/utils/stringUtil';
import IconButton from '@/components/button/IconButton';

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
          <IconButton
            width={30}
            height={30}
            onClick={onSortRequested('desc')}
            sx={{ backgroundColor: 'inherit' }}
            icon={<KeyboardArrowUpIcon sx={{ color: 'rgba(0, 0, 0, 1)' }} />}
          />
        );
      }
      if (descSort) {
        sortButton = (
          <IconButton
            width={30}
            height={30}
            onClick={onSortRequested(null)}
            sx={{ backgroundColor: 'inherit' }}
            icon={<KeyboardArrowDownIcon sx={{ color: 'rgba(0, 0, 0, 1)' }} />}
          />
        );
      }
      if (!ascSort && !descSort) {
        sortButton = (
          <IconButton
            width={30}
            height={30}
            onClick={onSortRequested('asc')}
            sx={{ backgroundColor: 'inherit' }}
            icon={<SortIcon fontSize={'small'} sx={{ color: 'rgba(0, 0, 0, 1)' }} />}
          />
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

const AddNewHeader = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Stack>
      <IconButton
        width={30}
        height={30}
        sx={{
          borderRadius: '8px',
          backgroundColor: 'rgba(0, 215, 45, 0.8)',
        }}
        icon={<AddIcon sx={{ color: 'rgba(0, 0, 0, 1)' }} />}
        onClick={onClick}
      />
    </Stack>
  );
};

export { AddNewHeader };

export default CustomHeader;
