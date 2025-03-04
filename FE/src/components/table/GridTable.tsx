import { styled } from '@mui/material/styles';
import { ColDef, SortChangedEvent } from 'ag-grid-community';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { useCallback, useMemo } from 'react';

import { ControlProps } from '@/common/hooks/useTable';

import CustomHeader from './components/CustomHeader';

export type GridTableProps = Omit<AgGridReactProps, 'rowData'> & {
  height?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  control?: ControlProps;
};

const GridTable = (props: GridTableProps) => {
  const {
    className,
    height,
    maxHeight = 300,
    width = '100%',
    minWidth = '100%',
    maxWidth = '100%',
    rowHeight = 55,
    control,
    defaultColDef: defaultColDefProp,
    ...restProps
  } = props;

  const calculateGridHeight = useMemo(() => {
    const rowCount = control?.data ? control?.data.length : 1;
    const totalHeight = rowCount * rowHeight + 53;
    return Math.min(Math.max(totalHeight, Number(50)), Number(maxHeight));
  }, [control?.data, maxHeight, rowHeight]);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      resizable: false,
      autoHeight: true,
      suppressMovable: true,
      headerComponent: CustomHeader,
      ...defaultColDefProp,
    }),
    [defaultColDefProp]
  );

  const handleSortChanged = useCallback(
    (event: SortChangedEvent) => {
      control?.onSort(event.columns);
      return;
    },
    [control]
  );

  return (
    <AgGridContainer
      className={className}
      height={height ?? calculateGridHeight}
      maxHeight={maxHeight}
      width={width}
      minWidth={minWidth}
      maxWidth={maxWidth}
    >
      <AgGridReact
        defaultColDef={defaultColDef}
        headerHeight={50}
        rowHeight={rowHeight}
        rowData={control?.data ?? []}
        enableCellTextSelection={true}
        ensureDomOrder={true}
        onSortChanged={handleSortChanged}
        {...restProps}
      />
    </AgGridContainer>
  );
};

const AgGridContainer = styled('div')<GridTableProps>(
  ({ height, maxHeight, width, minWidth, maxWidth }) => ({
    height: height,
    maxHeight: maxHeight,
    minHeight: 100,
    width: width,
    minWidth: minWidth,
    maxWidth: maxWidth,
    overflow: 'auto',

    '& .ag-root-wrapper': {
      borderRadius: '5px',
    },

    '& .ag-header-cell': {
      borderRight: '1px solid #ccc',
    },

    '& .ag-header-cell:last-child': {
      borderRight: 'none',
    },

    '& .ag-cell': {
      alignContent: 'center !important',
      borderRight: '1px solid #ccc !important',
      lineHeight: '1.8 !important',
    },

    '& .ag-cell:last-child': {
      borderRight: 'none !important',
    },
  })
);

export default GridTable;
