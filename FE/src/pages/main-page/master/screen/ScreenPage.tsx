import usePageGridTable from '@/common/hooks/usePageGridTable';
import { PromiseModalRef } from '@/common/hooks/usePromiseModal';
import { IPageRequest } from '@/common/model/Pageable';
import IconButton from '@/components/button/IconButton';
import SwitchInput from '@/components/inputs/SwitchInput';
import PageGridTable from '@/components/table/PageGridTable';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ColDef } from 'ag-grid-community';
import { cloneDeep } from 'lodash';
import { ChangeEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { searchAction } from './action/action';
import EditModal from './components/EditModal';
import TestModal from './components/TestModal';
import { ISearchScreenRequest } from './model/ScreenRequest';
import { IScreenTableRow } from './model/Table';
import './screen.css';

const ScreenMaster = () => {
  const [data, setData] = useState<IScreenTableRow[]>([]);
  const modalRef = useRef<PromiseModalRef<null, IScreenTableRow>>(null);
  const { commonProps, orderList } = usePageGridTable();

  const handleSearch = useCallback(async (searchCondition?: IPageRequest<ISearchScreenRequest>) => {
    const result = await searchAction(searchCondition);
    let tableData: IScreenTableRow[] = [];
    if (result.result) {
      tableData = result.result?.map(item => ({
        ...item,
      }));

      setData(tableData);
    }
  }, []);

  useEffect(() => {
    const searchCondition: IPageRequest<ISearchScreenRequest> = {
      orderList: orderList,
      page: 0,
      size: 10,
    };
    handleSearch(searchCondition);
  }, [handleSearch, orderList]);

  const handleSwitchActive = useCallback(
    (rowData: IScreenTableRow) => (event: ChangeEvent<HTMLInputElement>) => {
      setData(prev => {
        return cloneDeep(prev).map(item => {
          if (item.screenId === rowData.screenId) {
            item.active = event.target.checked;
          }
          return item;
        });
      });
    },
    []
  );

  const handleEdit = useCallback(
    (rowData: IScreenTableRow) => () => {
      modalRef.current?.open({ inputValue: rowData });
    },
    []
  );

  const defaultColDef = useMemo<ColDef<IScreenTableRow>>(
    () => ({
      resizable: false,
      autoHeight: true,
      unSortIcon: true,
      comparator: () => 0,
    }),
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
        wrapText: true,
      },
      {
        headerName: 'Screen URL',
        field: 'screenUrl',
        flex: 1,
        wrapText: true,
      },
      {
        headerName: 'Created datetime',
        field: 'createdDatetime',
        width: 200,
        wrapText: true,
      },
      {
        headerName: 'Status',
        field: 'active',
        sortable: false,
        headerClass: 'active-column',
        width: 150,
        wrapText: true,
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
        wrapText: true,
        cellRenderer: (params: { data: IScreenTableRow; value: boolean }) => {
          return (
            <Stack sx={{ justifySelf: 'center' }}>
              <IconButton
                width={30}
                height={30}
                sx={styles.editButton}
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

  return (
    <Stack spacing={2}>
      <Stack direction={'row'} spacing={2}>
        <Typography sx={{ alignSelf: 'center', justifySelf: 'center' }}>Screen master</Typography>
        <TestModal />
      </Stack>

      <Stack>
        <PageGridTable
          rowData={data}
          defaultColDef={defaultColDef}
          columnDefs={colDefs}
          commonProps={commonProps}
        />
      </Stack>
      <EditModal ref={modalRef} />
    </Stack>
  );
};

const styles = {
  editButton: {
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 200, 0, 0.8)',
  },
};

export default memo(ScreenMaster);
