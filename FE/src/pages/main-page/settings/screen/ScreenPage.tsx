import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ColDef } from 'ag-grid-community';
import { memo, useCallback, useEffect, useMemo } from 'react';

import { useRightDrawer } from '@/common/context/types/rightDrawerTypes';
import useTable from '@/common/hooks/useTable';
import { IPageRequest, IPageResponse } from '@/common/model/pageable';
import IconButton from '@/components/button/IconButton';
import PageGridTable from '@/components/table/PageGridTable';

import { searchAction } from './action/action';
import EditModal from './components/EditModal';
import TestModal from './components/TestModal';
import IScreenTableRow from './model/ScreenTableRow';
import ISearchScreenRequest from './model/SearchScreenRequest';
import ISearchScreenResponse from './model/SearchScreenResponse';
import './screen.css';

const ScreenPage = () => {
  const { control, pageable, onDataChange } = useTable<IScreenTableRow>();
  const { openDrawer } = useRightDrawer();

  const handleSearch = useCallback(
    async (searchCondition?: IPageRequest<ISearchScreenRequest>) => {
      const response: IPageResponse<ISearchScreenResponse[]> = await searchAction(searchCondition);
      if (response.result) {
        onDataChange(
          response.result.map(item => ({
            ...item,
          })),
          response
        );
      }
    },
    [onDataChange]
  );

  useEffect(() => {
    const searchCondition: IPageRequest<ISearchScreenRequest> = {
      ...pageable,
    };
    handleSearch(searchCondition);
  }, [handleSearch, pageable]);

  const handleEdit = useCallback(
    (rowData: IScreenTableRow) => () => {
      openDrawer({
        isOnClose: true,
        onCloseAction: () => {
          handleSearch({ ...pageable });
        },
        content: <EditModal data={rowData} />,
      });
    },
    [handleSearch, openDrawer, pageable]
  );

  const colDefs = useMemo<ColDef<IScreenTableRow>[]>(
    () => [
      {
        headerName: 'Screen ID',
        field: 'screenId',
        width: 180,
        cellRenderer: (params: { value: string }) => {
          return <Typography sx={{ color: 'rgba(255, 0, 0, 1)' }}>{params.value}</Typography>;
        },
      },
      {
        headerName: 'Screen name',
        field: 'screenName',
        flex: 1,
      },
      {
        headerName: 'Screen URL',
        field: 'screenUrl',
        flex: 1,
      },
      {
        headerName: 'Created datetime',
        field: 'createDatetime',
        width: 200,
      },
      {
        headerName: 'Created by',
        field: 'createdBy',
        width: 150,
      },
      {
        headerName: 'Updated datetime',
        field: 'updateDatetime',
        width: 200,
      },
      {
        headerName: 'Updated by',
        field: 'updatedBy',
        width: 150,
      },
      {
        headerName: 'Status',
        field: 'active',
        sortable: false,
        width: 150,
        cellRenderer: (params: { data: IScreenTableRow; value: boolean }) => {
          return (
            <Stack sx={{ justifySelf: 'center' }}>
              <Typography
                sx={{
                  color: params.value ? 'rgba(0, 225, 0, 1)' : 'rgba(255, 0, 0, 1)',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}
              >
                {params.value ? 'Active' : 'Deactive'}
              </Typography>
            </Stack>
          );
        },
      },
      {
        sortable: false,
        width: 80,
        cellRenderer: (params: { data: IScreenTableRow; value: boolean }) => {
          return (
            <Stack sx={{ justifySelf: 'center' }}>
              <IconButton
                className={'editButtons'}
                width={30}
                height={30}
                icon={<EditIcon sx={{ color: 'rgb(0, 0, 0)' }} />}
                onClick={handleEdit(params.data)}
              />
            </Stack>
          );
        },
      },
    ],
    [handleEdit]
  );

  return (
    <Stack spacing={2}>
      <Stack direction={'row'} spacing={2}>
        <Typography>Screen master</Typography>
        <TestModal />
      </Stack>

      <Stack>
        <PageGridTable height={'80vh'} maxHeight={'80vh'} columnDefs={colDefs} control={control} />
      </Stack>
    </Stack>
  );
};

export default memo(ScreenPage);
