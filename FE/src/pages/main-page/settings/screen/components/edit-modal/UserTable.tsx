import DeleteIcon from '@mui/icons-material/Delete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ColDef, RowSelectionOptions, SelectionChangedEvent } from 'ag-grid-community';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { MessageType } from '@/common/enums/messageEnum';
import useTable from '@/common/hooks/useTable';
import { IPageRequest, IPageResponse } from '@/common/model/Pageable';
import Button from '@/components/button/Button';
import IconButton from '@/components/button/IconButton';
import { openDialogContainer } from '@/components/dialog/DialogContainer';
import PageGridTable from '@/components/table/PageGridTable';

import IScreenUserRequest from '../../model/ScreenUserRequest';
import IScreenUserResponse from '../../model/ScreenUserResponse';
import IScreenUserTableRow from '../../model/ScreenUserTableRow';
import ISearchScreenRequest from '../../model/SearchScreenRequest';
import { getScreenUsers, removeUserAction } from './action';

type UserTableProps = {
  screenId?: string;
};

const UserTable = (props: UserTableProps) => {
  const { screenId } = props;

  const [selectedItem, setSelectedItem] = useState<string[]>([]);

  const { control, pageable, onDataChange, gridApiRef } = useTable<IScreenUserTableRow>();

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
    return { mode: 'multiRow', enableClickSelection: true };
  }, []);

  const colDefs = useMemo<ColDef<IScreenUserTableRow>[]>(
    () => [
      {
        headerName: 'User ID',
        field: 'userId',
        width: 200,
        cellRenderer: (params: { value: string }) => {
          return <Typography sx={{ color: 'rgba(255, 0, 0, 1)' }}>{params.value}</Typography>;
        },
      },
      {
        headerName: 'Email',
        field: 'email',
        width: 200,
      },
      {
        headerName: 'Username',
        field: 'userName',
        width: 200,
      },
      {
        headerName: 'Fullname',
        field: 'fullName',
        flex: 1,
      },
      {
        colId: 'delete',
        sortable: false,
        width: 80,
        cellRenderer: () => {
          return (
            <Stack sx={{ justifySelf: 'center' }}>
              <IconButton
                className={'removeButton'}
                width={30}
                height={30}
                icon={<DeleteIcon sx={{ color: 'rgba(0, 0, 0, 1)' }} />}
              />
            </Stack>
          );
        },
      },
    ],
    []
  );

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
      <Typography id={'editModalTitle'}>User using</Typography>

      <Stack direction={'row'}>
        <Button
          className={'multiRemoveButton'}
          width={150}
          label={'Multi remove'}
          startIcon={<DeleteSweepIcon />}
          onClick={handeMultiRemove}
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

export default memo(UserTable);
