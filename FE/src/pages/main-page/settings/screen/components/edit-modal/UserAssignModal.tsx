import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton as MUIIconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ColDef, RowSelectionOptions } from 'ag-grid-community';
import { memo, Ref, useCallback, useEffect, useMemo, useState } from 'react';
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

import IEditModalForm from '../../model/form/EditModalForm';
import IScreenUserTableRow from '../../model/form/ScreenUserTableRow';
import IScreenUserRequest from '../../model/request/ScreenUserRequest';
import IScreenUserResponse from '../../model/response/ScreenUserResponse';
import { getUsersNotUsing } from './action';

type UserAssignModalProps = {
  ref: Ref<ModalRef<IScreenUserTableRow, IEditModalForm>>;
};

const UserAssignModal = (props: UserAssignModalProps) => {
  const [keywordValue, setKeyWordValue] = useState<string>('');

  const { inputValue, handleClose, handleOk, openModal, onSelectionChanged } = useModal<
    IScreenUserTableRow,
    IEditModalForm
  >(props.ref);
  const { t } = useTranslation([I18nEnum.EDIT_SCREEN_I18N, I18nEnum.COMMON_I18N]);
  const { control, pageable, onDataChange, onSetLoading } = useTable<IScreenUserTableRow>();

  /**
   * Get screen user.
   */
  const onGetScreenUser = useCallback(
    async (searchCondition?: IPageRequest<IScreenUserRequest>) => {
      onSetLoading(true);
      const userResponse: IPageResponse<IScreenUserResponse> =
        await getUsersNotUsing(searchCondition);
      if (userResponse.result) {
        onDataChange(userResponse.result, userResponse);
      }
      onSetLoading(false);
    },
    [onDataChange, onSetLoading]
  );

  /**
   * Init action for user table and call search when change sort.
   */
  useEffect(() => {
    if (openModal) {
      const searchCondition: IPageRequest<IScreenUserRequest> = {
        condition: {
          screenId: inputValue?.screenId,
          roleList: inputValue?.roles,
          level: inputValue?.level,
          keyword: keywordValue,
        },
        ...pageable,
      };
      onGetScreenUser(searchCondition);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    inputValue?.level,
    inputValue?.roles,
    inputValue?.screenId,
    onGetScreenUser,
    openModal,
    pageable,
  ]);

  /**
   * Row selection config.
   */
  const rowSelection = useMemo<RowSelectionOptions>(() => {
    return { mode: 'multiRow' };
  }, []);

  /**
   * Column selection config.
   */
  const colDefs = useMemo<ColDef<IScreenUserTableRow>[]>(
    () => [
      {
        headerName: t('table.userId'),
        field: 'userId',
        width: 200,
        cellRenderer: (params: { value: string }) => {
          return <Typography sx={{ color: 'rgba(255, 0, 0, 1)' }}>{params.value}</Typography>;
        },
      },
      {
        headerName: t('table.email'),
        field: 'email',
        width: 230,
      },
      {
        headerName: t('table.userName'),
        field: 'userName',
        width: 170,
      },
      {
        headerName: t('table.fullName'),
        field: 'fullName',
        flex: 1,
      },
    ],
    [t]
  );

  const handleSearchUser = useCallback(() => {
    const searchCondition: IPageRequest<IScreenUserRequest> = {
      condition: {
        screenId: inputValue?.screenId,
        roleList: inputValue?.roles,
        level: inputValue?.level,
        keyword: keywordValue,
      },
      page: 1,
      size: 10,
      orderList: pageable.orderList,
    };
    onGetScreenUser(searchCondition);
  }, [
    inputValue?.level,
    inputValue?.roles,
    inputValue?.screenId,
    keywordValue,
    onGetScreenUser,
    pageable.orderList,
  ]);

  return (
    <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth={'md'}>
      {/* Dialog header */}
      <Stack direction={'row'} sx={{ height: '45px', padding: '8px' }}>
        <Stack sx={{ flex: 1, height: '30px', marginLeft: '30px' }}>
          <Typography variant={'h5'}>{t('assignUserTitle')}</Typography>
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
            label={t('label.searchUser')}
            width={200}
            height={35}
            onChange={(value: string) => {
              setKeyWordValue(value);
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position={'end'}>
                    <MUIIconButton edge={'end'} onClick={handleSearchUser}>
                      <SearchIcon sx={{ color: 'rgba(0, 0, 0, 1)' }} />
                    </MUIIconButton>
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
            onSelectionChanged={onSelectionChanged}
          />
        </Stack>
      </Stack>

      <Divider />

      {/* Dialog footer */}
      <Stack direction={'row-reverse'} spacing={1} sx={{ height: '45px', padding: '8px' }}>
        <Button
          label={t('common:button.cancel')}
          onClick={handleClose}
          sx={{ backgroundColor: 'rgba(255, 50, 50, 0.8)' }}
        />
        <Button
          label={t('common:button.ok')}
          sx={{ backgroundColor: 'rgba(0, 170, 255, 0.8)' }}
          onClick={handleOk}
        />
      </Stack>
    </Dialog>
  );
};

export default memo(UserAssignModal);
