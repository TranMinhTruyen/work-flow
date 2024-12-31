import usePromiseModal, { IPromiseModalHandle } from '@/common/hooks/usePromiseModal';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {
  ColDef,
  RowDoubleClickedEvent,
  RowSelectedEvent,
  SelectionChangedEvent,
} from 'ag-grid-community';
import { memo, Ref, useCallback, useEffect, useMemo } from 'react';
import GridTable from '../table/Table';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';

export interface Item {
  id: number;
  name: string;
}

const data: Item[] = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

export type IDemoModalProps = {
  ref: Ref<IPromiseModalHandle<Item>>;
};

const DemoModal = (props: IDemoModalProps) => {
  const { ref } = props;

  const {
    handleClose,
    handleDoubleClick,
    handleOk,
    openModal,
    items,
    setItems,
    selectedItem,
    setSelectedItem,
  } = usePromiseModal(ref);

  useEffect(() => {
    setItems(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colDefs = useMemo<ColDef<Item>[]>(
    () => [
      {
        headerName: 'id',
        field: 'id',
        width: 125,
        cellRenderer: (params: { value: string }) => {
          return <Typography sx={{ color: 'rgba(255, 0, 0, 1)' }}>{params.value}</Typography>;
        },
      },
      {
        headerName: 'name',
        field: 'name',
        flex: 1,
        wrapText: true,
      },
    ],
    []
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      resizable: false,
      autoHeight: true,
      sortable: false,
      cellRenderer: (params: { value: string }) => {
        return <Typography>{params.value}</Typography>;
      },
    }),
    []
  );

  const onRowSelected = useCallback(
    (event: RowSelectedEvent) => {
      setSelectedItem(event.node.data);
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
          <GridTable
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            rowData={items}
            onRowSelected={onRowSelected}
            onRowDoubleClicked={onRowDoubleClicked}
            suppressMovableColumns
          />
        </Stack>
      </Container>
    </Dialog>
  );
};

export default memo(DemoModal);
