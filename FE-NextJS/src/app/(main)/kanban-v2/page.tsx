'use client';

import { CURRENT_PATH } from '@/common/constants/commonConst';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { usePathname } from 'next/navigation';
import { memo, SyntheticEvent, useCallback, useEffect } from 'react';
import Board from './components/Board';
import { initData } from './services/action';
import { selectIsColumnDragging, toggleColumnDragging } from './services/kanbanSlice';

const KanbanV2Page = () => {
  const dispatch = useAppDispatch();
  const path = usePathname();

  const isColumnDragging = useAppSelector(selectIsColumnDragging);

  useEffect(() => {
    sessionStorage.setItem(CURRENT_PATH, path);
    initData();
  }, [path]);

  const handleChangeColumnDragging = useCallback(
    (_event: SyntheticEvent, _checked: boolean) => {
      dispatch(toggleColumnDragging());
    },
    [dispatch]
  );

  return (
    <Stack spacing={2}>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={isColumnDragging} />}
          onChange={handleChangeColumnDragging}
          label={isColumnDragging ? 'Column dragging enable' : 'Column dragging disable'}
        />
      </FormGroup>
      <Board />
    </Stack>
  );
};

export default memo(KanbanV2Page);
