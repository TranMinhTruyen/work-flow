import { styled } from '@mui/material/styles';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
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
    className,
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
    <AgGridContainer
      className={className}
      height={calculateGridHeight}
      maxHeight={maxHeight}
      width={width}
      minWidth={minWidth}
      maxWidth={maxWidth}
    >
      <AgGridReact
        headerHeight={50}
        rowHeight={rowHeight}
        rowData={rowData}
        enableCellTextSelection={true}
        ensureDomOrder={true}
        {...restProps}
      />
    </AgGridContainer>
  );
};

const AgGridContainer = styled('div')<TableProps>(
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
