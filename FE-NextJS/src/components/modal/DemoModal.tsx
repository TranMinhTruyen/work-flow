import usePromiseModal, { IPromiseModalHandle } from '@/common/hooks/usePromiseModal';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {
  ColDef,
  RowDoubleClickedEvent,
  RowSelectionOptions,
  SelectionChangedEvent,
} from 'ag-grid-community';
import { memo, Ref, useCallback, useEffect, useMemo } from 'react';
import GridTable from '@/components/table/Table';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
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

export type IDemoModalProps = {
  ref: Ref<IPromiseModalHandle<Item>>;
};

const DemoModal = (props: IDemoModalProps) => {
  const { ref } = props;

  const { handleClose, handleDoubleClick, handleOk, openModal, items, setItems, setSelectedItem } =
    usePromiseModal<Item>(ref);

  useEffect(() => {
    setItems(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colDefs = useMemo<ColDef<Item>[]>(
    () => [
      {
        headerName: 'id',
        field: 'id',
        width: 120,
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

  const rowSelection = useMemo<RowSelectionOptions>(() => {
    return { mode: 'singleRow', enableClickSelection: true };
  }, []);

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
          <GridTable
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

export default memo(DemoModal);
