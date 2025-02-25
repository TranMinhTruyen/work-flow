import { PromiseModalRef } from '@/common/hooks/usePromiseModal';
import IconButton from '@/components/button/IconButton';
import GridTable from '@/components/table/GridTable';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { ColDef } from 'ag-grid-community';
import { cloneDeep } from 'lodash';
import { ChangeEvent, memo, useCallback, useMemo, useRef, useState } from 'react';
import { initMockData } from './action/action';
import EditModal from './components/EditModal';
import TestModal from './components/TestModal';
import { IScreenMasterRow } from './model/Table';
import './screen.css';

const ScreenMaster = () => {
  const [data, setData] = useState(initMockData());
  const modalRef = useRef<PromiseModalRef<null, IScreenMasterRow>>(null);

  const handleSwitchActive = useCallback(
    (rowData: IScreenMasterRow) => (event: ChangeEvent<HTMLInputElement>) => {
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
    (rowData: IScreenMasterRow) => () => {
      modalRef.current?.open({ inputValue: rowData });
    },
    []
  );

  const defaultColDef = useMemo<ColDef<IScreenMasterRow>>(
    () => ({
      resizable: false,
      autoHeight: true,
    }),
    []
  );

  const colDefs = useMemo<ColDef<IScreenMasterRow>[]>(
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
        headerName: 'Create datetime',
        field: 'createDateTime',
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
        cellRenderer: (params: { data: IScreenMasterRow; value: boolean }) => {
          return (
            <Stack sx={{ justifySelf: 'center' }}>
              <Switch checked={params.value} onChange={handleSwitchActive(params.data)} />
            </Stack>
          );
        },
      },
      {
        sortable: false,
        width: 80,
        wrapText: true,
        cellRenderer: (params: { data: IScreenMasterRow; value: boolean }) => {
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
    []
  );

  return (
    <Stack spacing={2}>
      <Stack direction={'row'} spacing={2}>
        <Typography sx={{ alignSelf: 'center', justifySelf: 'center' }}>Screen master</Typography>
        <TestModal />
      </Stack>

      <Stack>
        <GridTable
          rowData={data}
          defaultColDef={defaultColDef}
          columnDefs={colDefs}
          suppressMovableColumns
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
