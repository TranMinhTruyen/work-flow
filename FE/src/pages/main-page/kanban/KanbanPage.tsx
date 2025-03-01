import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { memo, SyntheticEvent, useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/lib/store';
import useRouter from '@/common/hooks/useRouter';
import { CURRENT_PATH } from '@/common/constants/commonConst';

import { initData } from './action/action';
import { selectIsColumnDragging, toggleColumnDragging } from './action/kanbanSlice';
import Board from './components/Board';

const KanbanV2Page = () => {
  const dispatch = useAppDispatch();
  const { currentPath } = useRouter();

  const isColumnDragging = useAppSelector(selectIsColumnDragging);

  useEffect(() => {
    sessionStorage.setItem(CURRENT_PATH, currentPath);
    initData();
  }, [currentPath]);

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
