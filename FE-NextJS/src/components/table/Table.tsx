'use client';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import '../table/Table.css';
import { useMemo } from 'react';

export type TableProps = AgGridReactProps & {
  height?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
};

const GridTable = (props: TableProps) => {
  const {
    maxHeight = 300,
    width = '100%',
    minWidth = '100%',
    maxWidth = '100%',
    rowHeight = 55,
    rowData = [],
    ...restProps
  } = props;

  const calculateGridHeight = useMemo(() => {
    const rowCount = rowData ? rowData.length : 1;
    const totalHeight = rowCount * rowHeight + 53;
    return Math.min(Math.max(totalHeight, Number(50)), Number(maxHeight));
  }, [maxHeight, rowData, rowHeight]);

  return (
    <div
      style={{
        height: calculateGridHeight,
        maxHeight: maxHeight,
        minHeight: 100,
        width: width,
        minWidth: minWidth,
        maxWidth: maxWidth,
        overflow: 'auto',
      }}
    >
      <AgGridReact headerHeight={50} rowHeight={rowHeight} rowData={rowData} {...restProps} />
    </div>
  );
};

export default GridTable;
