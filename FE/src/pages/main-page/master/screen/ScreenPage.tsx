import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ColDef } from 'ag-grid-community';
import { cloneDeep } from 'lodash';
import { ChangeEvent, memo, useCallback, useEffect, useMemo, useRef } from 'react';

import { useRightDrawer } from '@/common/context/RightDrawerContext';
import { ModalRef } from '@/common/hooks/types/useModalTypes';
import useTable from '@/common/hooks/useTable';
import { IPageRequest, IPageResponse } from '@/common/model/pageable';
import Button from '@/components/button/Button';
import IconButton from '@/components/button/IconButton';
import SwitchInput from '@/components/inputs/SwitchInput';
import PageGridTable from '@/components/table/PageGridTable';

import { searchAction } from './action/action';
import EditModal from './components/EditModal';
import TestModal from './components/TestModal';
import { ISearchScreenRequest } from './model/screenRequest';
import { ISearchScreenResponse } from './model/screenResponse';
import { IScreenTableRow } from './model/table';

import './screen.css';

const ScreenPage = () => {
  const modalRef = useRef<ModalRef<null, IScreenTableRow>>(null);
  const { control, pageable, onPageableChange, data, onDataChange } = useTable<IScreenTableRow>();
  const { openDrawer } = useRightDrawer();

  const handleSearch = useCallback(
    async (searchCondition?: IPageRequest<ISearchScreenRequest>) => {
      const response: IPageResponse<ISearchScreenResponse[]> = await searchAction(searchCondition);
      if (response.result) {
        onPageableChange({ ...response });
        onDataChange(
          response.result.map(item => ({
            ...item,
          }))
        );
      }
    },
    [onDataChange, onPageableChange]
  );

  useEffect(() => {
    const searchCondition: IPageRequest<ISearchScreenRequest> = {
      ...pageable,
    };
    handleSearch(searchCondition);
  }, [handleSearch, pageable]);

  const handleSwitchActive = useCallback(
    (rowData: IScreenTableRow) => (event: ChangeEvent<HTMLInputElement>) => {
      onDataChange(
        cloneDeep(data ?? []).map(item => {
          if (item.screenId === rowData.screenId) {
            item.active = event.target.checked;
          }
          return item;
        })
      );
    },
    [data, onDataChange]
  );

  const handleEdit = useCallback(
    (rowData: IScreenTableRow) => () => {
      modalRef.current?.open({ inputValue: rowData });
    },
    []
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
        field: 'createdDatetime',
        width: 200,
      },
      {
        headerName: 'Status',
        field: 'active',
        sortable: false,
        width: 150,
        cellRenderer: (params: { data: IScreenTableRow; value: boolean }) => {
          return (
            <Stack sx={{ justifySelf: 'center' }}>
              <SwitchInput checked={params.value} onChange={handleSwitchActive(params.data)} />
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
    [handleEdit, handleSwitchActive]
  );

  const handleOpenSideDrawer = useCallback(() => {
    openDrawer({
      isOnClose: true,
    });
  }, [openDrawer]);

  return (
    <Stack spacing={2}>
      <Stack direction={'row'} spacing={2}>
        <Typography>Screen master</Typography>
        <TestModal />
        <Button label={'Open side dialog'} onClick={handleOpenSideDrawer} />
      </Stack>

      <Stack>
        <PageGridTable height={'80vh'} maxHeight={'80vh'} columnDefs={colDefs} control={control} />
      </Stack>
      <EditModal ref={modalRef} />
    </Stack>
  );
};

export default memo(ScreenPage);
