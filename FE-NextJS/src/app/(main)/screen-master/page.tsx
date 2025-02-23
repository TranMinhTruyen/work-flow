'use client';

import GridTable from '@/components/table/GridTable';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ColDef } from 'ag-grid-community';
import { memo, useMemo } from 'react';
import TestModal from './components/TestModal';
import { IScreenMasterCol } from './model/Table';

const ScreenMaster = () => {
  const defaultColDef = useMemo<ColDef<IScreenMasterCol>>(
    () => ({
      resizable: false,
      autoHeight: true,
      sortable: false,
    }),
    []
  );

  const colDefs = useMemo<ColDef<IScreenMasterCol>[]>(
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
        width: 150,
        wrapText: true,
      },
      {
        colId: 'active',
        headerName: 'Active',
        width: 150,
        wrapText: true,
      },
    ],
    []
  );

  return (
    <Stack spacing={2}>
      <Stack direction={'row'} spacing={2}>
        <Typography sx={{ alignSelf: 'center' }}>Screen master</Typography>
        <TestModal />
      </Stack>

      <Stack>
        <GridTable defaultColDef={defaultColDef} columnDefs={colDefs} suppressMovableColumns />
      </Stack>
    </Stack>
  );
};

export default memo(ScreenMaster);
