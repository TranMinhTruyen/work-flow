import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ColDef, RowSelectionOptions, SelectionChangedEvent } from 'ag-grid-community';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { I18nEnum } from '@/common/enums/i18nEnum';
import { MessageType } from '@/common/enums/messageEnum';
import { ModalRef } from '@/common/hooks/types/useModalTypes';
import useTable from '@/common/hooks/useTable';
import { IPageRequest, IPageResponse } from '@/common/model/Pageable';
import SubmitButton from '@/components/button/SubmitButton';
import SubmitIconButton from '@/components/button/SubmitIconButton';
import { openDialogContainer } from '@/components/dialog/DialogContainer';
import TextInput from '@/components/inputs/TextInput';
import { AddNewHeader } from '@/components/table/components/CustomHeader';
import PageGridTable from '@/components/table/PageGridTable';

import IEditModalForm from '../../model/form/EditModalForm';
import IScreenUserTableRow from '../../model/form/ScreenUserTableRow';
import IScreenUserRequest from '../../model/request/ScreenUserRequest';
import ISearchScreenRequest from '../../model/request/SearchScreenRequest';
import IScreenUserResponse from '../../model/response/ScreenUserResponse';
import { assignUserAction, getScreenUsers, removeUserAction } from './action';
import UserAssignModal from './UserAssignModal';

type ScreenUserProps = {
  screenDetail?: IEditModalForm;
};

const ScreenUserTable = (props: ScreenUserProps) => {
  const { screenDetail } = props;

  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const { control, pageable, onDataChange, gridApiRef } = useTable<IScreenUserTableRow>();
  const { t } = useTranslation([I18nEnum.EDIT_SCREEN_I18N, I18nEnum.COMMON_I18N]);
  const [keywordValue, setKeyWordValue] = useState<string>('');

  const userAssignModalRef = useRef<ModalRef<IScreenUserTableRow, IEditModalForm>>(null);

  /**
   * Get screen user.
   */
  const onGetScreenUser = useCallback(
    async (searchCondition?: IPageRequest<IScreenUserRequest>) => {
      gridApiRef.current?.setGridOption('loading', true);
      const userResponse: IPageResponse<IScreenUserResponse> =
        await getScreenUsers(searchCondition);
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
    const searchCondition: IPageRequest<IScreenUserRequest> = {
      condition: {
        screenId: screenDetail?.screenId,
        keyword: keywordValue,
      },
      ...pageable,
    };
    onGetScreenUser(searchCondition);
  }, [keywordValue, onGetScreenUser, pageable, screenDetail]);

  const rowSelection = useMemo<RowSelectionOptions>(() => {
    return { mode: 'multiRow' };
  }, []);

  /**
   * Handle click remove button in table.
   */
  const handleClickRemoveButton = useCallback(
    (data: IScreenUserTableRow) => async () => {
      const response = await removeUserAction(screenDetail?.screenId, [`${data.userId}`]);
      if (response) {
        openDialogContainer({
          type: 'message',
          maxWidth: 'xs',
          messageType: MessageType.INFO,
          isPopup: false,
          onConfirm: () => {
            const searchCondition: IPageRequest<ISearchScreenRequest> = {
              condition: { screenId: screenDetail?.screenId },
              ...pageable,
            };
            onGetScreenUser(searchCondition);
          },
          bodyElement: (
            <Typography>{`${t('message.removeUserMessage')} ${response.totalRemoveUser}`}</Typography>
          ),
        });
      }
    },
    [onGetScreenUser, pageable, screenDetail?.screenId, t]
  );

  /**
   * Handle confirm assign user.
   */
  const handleSubmitAssignUser = useCallback(
    (modalData: IScreenUserTableRow[]) => async () => {
      const listUserId = modalData.map(item => item.userId ?? '');
      const response = await assignUserAction(screenDetail?.screenId, listUserId);
      if (response) {
        openDialogContainer({
          type: 'message',
          maxWidth: 'xs',
          messageType: MessageType.INFO,
          isPopup: false,
          onConfirm: () => {
            const searchCondition: IPageRequest<ISearchScreenRequest> = {
              condition: { screenId: screenDetail?.screenId },
              ...pageable,
            };
            onGetScreenUser(searchCondition);
          },
          bodyElement: (
            <Typography>{`${t('message.assignUserMessage')} ${response.totalUserAssign}`}</Typography>
          ),
        });
      }
    },
    [onGetScreenUser, pageable, screenDetail?.screenId, t]
  );

  /**
   * Open assign user modal.
   */
  const handleOpenAssignUserModal = useCallback(async () => {
    const result = await userAssignModalRef.current?.open({
      inputValue: screenDetail,
    });
    if (result) {
      if (result.status === 'OK' && result.value.length === 0) {
        openDialogContainer({
          type: 'message',
          maxWidth: 'xs',
          messageType: MessageType.ERROR,
          isPopup: false,
          onConfirm: handleOpenAssignUserModal,
          bodyElement: <Typography>{t('message.noUserSelected')}</Typography>,
        });
      }
      if (result.status === 'OK' && result.value.length > 0) {
        openDialogContainer({
          type: 'message',
          maxWidth: 'xs',
          messageType: MessageType.INFO,
          isPopup: false,
          onConfirm: handleSubmitAssignUser(result.value),
          onCancel: handleOpenAssignUserModal,
          showCancelButton: true,
          bodyElement: <Typography>{t('common:buttonMessage.submit')}</Typography>,
        });
      }
    }
  }, [handleSubmitAssignUser, screenDetail, t]);

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
      {
        colId: 'remove',
        sortable: false,
        width: 65,
        headerComponent: AddNewHeader,
        headerComponentParams: { onClick: handleOpenAssignUserModal },
        cellRenderer: (params: { data: IScreenUserTableRow }) => {
          return (
            <Stack sx={{ justifySelf: 'center' }}>
              <SubmitIconButton
                className={'removeButton'}
                width={30}
                height={30}
                icon={<DeleteIcon sx={{ color: 'rgba(0, 0, 0, 1)' }} />}
                onSubmit={handleClickRemoveButton(params.data)}
              />
            </Stack>
          );
        },
      },
    ],
    [handleClickRemoveButton, handleOpenAssignUserModal, t]
  );

  /**
   * Set select item for remove.
   */
  const onSelectionChanged = useCallback(
    (event: SelectionChangedEvent) => {
      const selectedNodes = event.api.getSelectedNodes();
      if (selectedNodes.length > 0) {
        const selected: string[] = [];
        for (const node of selectedNodes) {
          selected.push(node.data.userId);
        }
        setSelectedItem(selected);
      } else {
        setSelectedItem([]);
      }
    },
    [setSelectedItem]
  );

  const handeMultiRemove = useCallback(async () => {
    const response = await removeUserAction(screenDetail?.screenId, selectedItem);
    if (response) {
      openDialogContainer({
        type: 'message',
        maxWidth: 'xs',
        messageType: MessageType.INFO,
        isPopup: false,
        onConfirm: () => {
          const searchCondition: IPageRequest<ISearchScreenRequest> = {
            condition: { screenId: screenDetail?.screenId },
            ...pageable,
          };
          onGetScreenUser(searchCondition);
        },
        bodyElement: <Typography>{`Total user removed: ${response.totalRemoveUser}`}</Typography>,
      });
    }
  }, [onGetScreenUser, pageable, screenDetail?.screenId, selectedItem]);

  return (
    <Stack spacing={1}>
      <Typography id={'editModalTitle'}>{t('label.userUsing')}</Typography>

      <Stack direction={'row'} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <SubmitButton
          className={'deleteSelectedButton'}
          label={t('button.deleteSelected')}
          startIcon={<DeleteIcon />}
          onSubmit={handeMultiRemove}
          disabled={selectedItem.length === 0}
        />

        <Stack direction={'row'} spacing={1}>
          <TextInput
            id={'searchUser'}
            label={t('label.searchUser')}
            width={200}
            height={35}
            onBlur={(value: string) => {
              setKeyWordValue(value);
            }}
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
        </Stack>
      </Stack>

      <PageGridTable
        height={'45vh'}
        maxHeight={'45vh'}
        columnDefs={colDefs}
        control={control}
        rowSelection={rowSelection}
        onSelectionChanged={onSelectionChanged}
      />

      <UserAssignModal ref={userAssignModalRef} />
    </Stack>
  );
};

export default memo(ScreenUserTable);
