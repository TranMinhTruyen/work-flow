import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ColDef, RowSelectionOptions } from 'ag-grid-community';
import { memo, Ref, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { I18nEnum } from '@/common/enums/i18nEnum';
import { ModalRef } from '@/common/hooks/types/useModalTypes';
import useModal from '@/common/hooks/useModal';
import useTable from '@/common/hooks/useTable';
import { IPageRequest, IPageResponse } from '@/common/model/Pageable';
import Button from '@/components/button/Button';
import IconButton from '@/components/button/IconButton';
import TextInput from '@/components/inputs/TextInput';
import PageGridTable from '@/components/table/PageGridTable';

import IScreenUserTableRow from '../../model/form/ScreenUserTableRow';
import IScreenUserRequest from '../../model/request/ScreenUserRequest';
import IScreenUserResponse from '../../model/response/ScreenUserResponse';
import { getUsersNotUsing } from './action';

export type UserAssignModalProps = {
  ref: Ref<ModalRef<IScreenUserTableRow, { screenId: string }>>;
};

const UserAssignModal = (props: UserAssignModalProps) => {
  const { inputValue, handleClose, handleDoubleClick, handleOk, openModal, setSelectedItem } =
    useModal<IScreenUserTableRow, { screenId: string }>(props.ref);
  const { t } = useTranslation([I18nEnum.COMMON_I18N, I18nEnum.EDIT_SCREEN_I18N]);
  const { control, pageable, onDataChange, gridApiRef } = useTable<IScreenUserTableRow>();

  /**
   * Get screen user.
   */
  const onGetScreenUser = useCallback(
    async (searchCondition?: IPageRequest<IScreenUserRequest>) => {
      gridApiRef.current?.setGridOption('loading', true);
      const userResponse: IPageResponse<IScreenUserResponse> =
        await getUsersNotUsing(searchCondition);
      if (userResponse.result) {
        onDataChange(userResponse.result, userResponse);
      }
      gridApiRef.current?.setGridOption('loading', false);
    },
    [gridApiRef, onDataChange]
  );

  /**
   * Init action for user table and call search when change sort.
   */
  useEffect(() => {
    if (openModal) {
      const searchCondition: IPageRequest<IScreenUserRequest> = {
        condition: { screenId: inputValue?.screenId },
        ...pageable,
      };
      onGetScreenUser(searchCondition);
    }
  }, [inputValue?.screenId, onGetScreenUser, openModal, pageable]);

  const rowSelection = useMemo<RowSelectionOptions>(() => {
    return { mode: 'multiRow' };
  }, []);

  const colDefs = useMemo<ColDef<IScreenUserTableRow>[]>(
    () => [
      {
        headerName: t('editScreen:table.userId'),
        field: 'userId',
        width: 200,
        cellRenderer: (params: { value: string }) => {
          return <Typography sx={{ color: 'rgba(255, 0, 0, 1)' }}>{params.value}</Typography>;
        },
      },
      {
        headerName: t('editScreen:table.email'),
        field: 'email',
        width: 230,
      },
      {
        headerName: t('editScreen:table.userName'),
        field: 'userName',
        width: 170,
      },
      {
        headerName: t('editScreen:table.fullName'),
        field: 'fullName',
        flex: 1,
      },
    ],
    [t]
  );

  return (
    <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth={'md'}>
      {/* Dialog header */}
      <Stack direction={'row'} sx={{ height: '45px', padding: '8px' }}>
        <Stack sx={{ flex: 1, height: '30px', marginLeft: '30px' }}>
          <Typography variant={'h5'}>User assign</Typography>
        </Stack>

        <IconButton
          width={30}
          height={30}
          onClick={handleClose}
          color={'primary'}
          icon={<CloseIcon />}
        />
      </Stack>

      <Divider />

      {/* Dialog body */}
      <Stack>
        <Stack sx={{ padding: '16px', overflow: 'auto' }} spacing={1}>
          {/* Search input */}
          <TextInput
            id={'searchUser'}
            label={t('editScreen:label.searchUser')}
            width={200}
            height={35}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position={'start'}>
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* User table */}
          <PageGridTable
            height={'40vh'}
            maxHeight={'40vh'}
            columnDefs={colDefs}
            control={control}
            rowSelection={rowSelection}
          />
        </Stack>
      </Stack>

      <Divider />

      {/* Dialog footer */}
      <Stack direction={'row-reverse'} spacing={1} sx={{ height: '45px', padding: '8px' }}>
        <Button
          label={t('button.cancel')}
          onClick={handleClose}
          sx={{ backgroundColor: 'rgba(255, 50, 50, 0.8)' }}
        />
        <Button label={t('button.ok')} sx={{ backgroundColor: 'rgba(0, 170, 255, 0.8)' }} />
      </Stack>
    </Dialog>
  );
};

export default memo(UserAssignModal);
