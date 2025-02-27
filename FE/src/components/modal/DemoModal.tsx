import usePromiseModal, { PromiseModalRef } from '@/common/hooks/usePromiseModal';
import GridTable from '@/components/table/GridTable';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import styled from '@mui/system/styled';
import {
  ColDef,
  ICellRendererParams,
  RowDoubleClickedEvent,
  RowSelectionOptions,
  SelectionChangedEvent,
} from 'ag-grid-community';
import { memo, Ref, useCallback, useEffect, useMemo } from 'react';
import Button from '../button/Button';

export interface Item {
  id: number;
  name: string;
}

const data: Item[] = [
  { id: 1, name: 'admin' },
  { id: 2, name: 'admin2' },
  { id: 3, name: 'admin3' },
];

export type TestInputValue = {
  value1?: string;
  value2?: string;
};

type DemoModalProps = {
  ref: Ref<PromiseModalRef<Item, TestInputValue>>;
};

const DemoModal = (props: DemoModalProps) => {
  const {
    inputValue,
    handleClose,
    handleDoubleClick,
    handleOk,
    openModal,
    items,
    setItems,
    setSelectedItem,
  } = usePromiseModal<Item, TestInputValue>(props.ref);

  useEffect(() => {
    setItems(data);
  }, [setItems]);

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

  const onSelectionChanged = useCallback(
    (event: SelectionChangedEvent) => {
      const selectedNodes = event.api.getSelectedNodes();
      const selectedData = selectedNodes.length > 0 ? selectedNodes[0].data : null;
      setSelectedItem(selectedData);
    },
    [setSelectedItem]
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
          <Table
            rowData={items}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            rowSelection={rowSelection}
            onSelectionChanged={onSelectionChanged}
            onRowDoubleClicked={onRowDoubleClicked}
            suppressMovableColumns
          />
        </Stack>
        <Button
          sx={{
            backgroundColor: 'rgba(0, 170, 255, 0.8)',
          }}
          label={
            <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{'Ok'}</Typography>
          }
          onClick={handleOk}
        />
      </Container>
    </Dialog>
  );
};

const Table = styled(GridTable)({
  '& .ag-header-cell[col-id="id"]': {
    '& .ag-header-cell-label': {
      justifyContent: 'center',
    },
  },
});

export default memo(DemoModal);
