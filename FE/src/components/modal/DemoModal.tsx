import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  ColDef,
  ICellRendererParams,
  RowDoubleClickedEvent,
  RowSelectionOptions,
} from 'ag-grid-community';
import { memo, Ref, useCallback, useMemo } from 'react';

import { ModalRef } from '@/common/hooks/types/useModalTypes';
import useModal from '@/common/hooks/useModal';
import useTable from '@/common/hooks/useTable';
import GridTable from '@/components/table/GridTable';

import Button from '../button/Button';

export interface Item {
  id: number;
  name: string;
}

const dataMock: Item[] = [
  { id: 1, name: 'admin' },
  { id: 2, name: 'admin2' },
  { id: 3, name: 'admin3' },
];

export type TestInputValue = {
  value1?: string;
  value2?: string;
};

type DemoModalProps = {
  ref: Ref<ModalRef<Item, TestInputValue>>;
};

const DemoModal = (props: DemoModalProps) => {
  const { inputValue, handleClose, handleDoubleClick, handleOk, openModal, onSelectionChanged } =
    useModal<Item, TestInputValue>(props.ref);

  const { control } = useTable<Item>({ defaultValues: { data: dataMock } });

  const colDefs = useMemo<ColDef<Item>[]>(
    () => [
      {
        headerName: 'ID',
        field: 'id',
        maxWidth: 100,
        cellStyle: { textAlign: 'center' },
        cellRenderer: (params: ICellRendererParams<Item>) => {
          return <Typography>{params.data?.id}</Typography>;
        },
      },
      {
        headerName: 'Name',
        field: 'name',
        flex: 1,
        wrapText: true,
        cellRenderer: (params: ICellRendererParams<Item>) => {
          return <Typography>{params.data?.name}</Typography>;
        },
      },
    ],
    []
  );

  const rowSelection = useMemo<RowSelectionOptions>(() => {
    return { mode: 'singleRow', enableClickSelection: true };
  }, []);

  const defaultColDef = useMemo<ColDef<Item>>(
    () => ({
      resizable: false,
      autoHeight: true,
      sortable: false,
    }),
    []
  );

  const onRowDoubleClicked = useCallback(
    (event: RowDoubleClickedEvent) => {
      handleDoubleClick(event.data);
    },
    [handleDoubleClick]
  );

  return (
    <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth={'md'}>
      <Container>
        <Stack spacing={1}>
          <Typography>{inputValue?.value1}</Typography>
          <Typography>{inputValue?.value2}</Typography>
          <GridTable
            control={control}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            rowSelection={rowSelection}
            onSelectionChanged={onSelectionChanged}
            onRowDoubleClicked={onRowDoubleClicked}
          />
        </Stack>
        <Button
          sx={{
            backgroundColor: 'rgba(0, 170, 255, 0.8)',
          }}
          label={'Ok'}
          onClick={handleOk}
        />
      </Container>
    </Dialog>
  );
};

export default memo(DemoModal);
