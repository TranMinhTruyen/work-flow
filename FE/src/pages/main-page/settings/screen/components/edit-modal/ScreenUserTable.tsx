import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ColDef, RowSelectionOptions, SelectionChangedEvent } from 'ag-grid-community';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { I18nEnum } from '@/common/enums/i18nEnum';
import { MessageType } from '@/common/enums/messageEnum';
import useTable from '@/common/hooks/useTable';
import { IPageRequest, IPageResponse } from '@/common/model/Pageable';
import IconButton from '@/components/button/IconButton';
import SubmitButton from '@/components/button/SubmitButton';
import { openDialogContainer } from '@/components/dialog/DialogContainer';
import PageGridTable from '@/components/table/PageGridTable';

import IScreenUserRequest from '../../model/ScreenUserRequest';
import IScreenUserResponse from '../../model/ScreenUserResponse';
import IScreenUserTableRow from '../../model/ScreenUserTableRow';
import ISearchScreenRequest from '../../model/SearchScreenRequest';
import { getScreenUsers, removeUserAction } from './action';

type ScreenUserProps = {
  screenId?: string;
};

const ScreenUserTable = (props: ScreenUserProps) => {
  const { screenId } = props;

  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const { control, pageable, onDataChange, gridApiRef } = useTable<IScreenUserTableRow>();
  const { t } = useTranslation(I18nEnum.EDIT_SCREEN_I18N);

  /**
   * Get screen user.
   */
  const onGetScreenUser = useCallback(
    async (searchCondition?: IPageRequest<IScreenUserRequest>) => {
      gridApiRef.current?.setGridOption('loading', true);
      const userResponse: IPageResponse<IScreenUserResponse> =
        await getScreenUsers(searchCondition);
      if (userResponse.result && userResponse.result.length > 0) {
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
    const searchCondition: IPageRequest<ISearchScreenRequest> = {
      condition: { screenId: screenId },
      ...pageable,
    };
    onGetScreenUser(searchCondition);
  }, [onGetScreenUser, pageable, screenId]);

  const rowSelection = useMemo<RowSelectionOptions>(() => {
    return { mode: 'multiRow' };
  }, []);

  /**
   * Handle click remove button in table.
   */
  const handleClickRemoveButton = useCallback(
    (data: IScreenUserTableRow) => async () => {
      const response = await removeUserAction(screenId, [`${data.userId}`]);
      if (response) {
        openDialogContainer({
          type: 'message',
          maxWidth: 'xs',
          messageType: MessageType.INFO,
          isPopup: false,
          onConfirm: () => {
            const searchCondition: IPageRequest<ISearchScreenRequest> = {
              condition: { screenId: screenId },
              ...pageable,
            };
            onGetScreenUser(searchCondition);
          },
          bodyElement: <Typography>{`Total user removed: ${response.totalRemoveUser}`}</Typography>,
        });
      }
    },
    [onGetScreenUser, pageable, screenId]
  );

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
        // wrapText: true,
      },
      {
        colId: 'remove',
        sortable: false,
        width: 65,
        headerComponent: AddNewHeader,
        cellRenderer: (params: { data: IScreenUserTableRow }) => {
          return (
            <Stack sx={{ justifySelf: 'center' }}>
              <IconButton
                className={'removeButton'}
                width={30}
                height={30}
                icon={<DeleteIcon sx={{ color: 'rgba(0, 0, 0, 1)' }} />}
                onClick={handleClickRemoveButton(params.data)}
              />
            </Stack>
          );
        },
      },
    ],
    [handleClickRemoveButton, t]
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
    const response = await removeUserAction(screenId, selectedItem);
    if (response) {
      openDialogContainer({
        type: 'message',
        maxWidth: 'xs',
        messageType: MessageType.INFO,
        isPopup: false,
        onConfirm: () => {
          const searchCondition: IPageRequest<ISearchScreenRequest> = {
            condition: { screenId: screenId },
            ...pageable,
          };
          onGetScreenUser(searchCondition);
        },
        bodyElement: <Typography>{`Total user removed: ${response.totalRemoveUser}`}</Typography>,
      });
    }
  }, [onGetScreenUser, pageable, screenId, selectedItem]);

  return (
    <Stack spacing={1}>
      <Typography id={'editModalTitle'}>{t('label.userUsing')}</Typography>

      <Stack direction={'row'}>
        <SubmitButton
          className={'deleteSelectedButton'}
          label={t('button.deleteSelected')}
          startIcon={<DeleteIcon />}
          onSubmit={handeMultiRemove}
          disabled={selectedItem.length === 0}
        />
      </Stack>

      <PageGridTable
        height={'50vh'}
        maxHeight={'50vh'}
        columnDefs={colDefs}
        control={control}
        rowSelection={rowSelection}
        onSelectionChanged={onSelectionChanged}
      />
    </Stack>
  );
};

const AddNewHeader = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Stack>
      <IconButton
        className={'addButton'}
        width={30}
        height={30}
        icon={<AddIcon sx={{ color: 'rgba(0, 0, 0, 1)' }} />}
        onClick={onClick}
      />
    </Stack>
  );
};

export default memo(ScreenUserTable);
