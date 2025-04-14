import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { ColDef, GridReadyEvent, RowClassParams } from 'ag-grid-community';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { I18nEnum } from '@/common/enums/i18nEnum';
import { ControlProps } from '@/common/hooks/types/useTableTypes';

import IconButton from '../button/IconButton';
import CustomCell from './components/CustomCell';
import CustomHeader from './components/CustomHeader';
import CustomLoading from './components/CustomLoading';

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
    rowHeight = 50,
    control,
    defaultColDef: defaultColDefProp,
    ...restProps
  } = props;

  const { t } = useTranslation(I18nEnum.COMMON_I18N);

  const calculateGridHeight = useMemo(() => {
    const rowCount = control?.data ? control?.data.length : 1;
    const totalHeight = rowCount * rowHeight + 55;
    return Math.min(Math.max(totalHeight, Number(50)), Number(maxHeight));
  }, [control?.data, maxHeight, rowHeight]);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      resizable: false,
      autoHeight: true,
      suppressMovable: true,
      wrapText: false,
      headerComponent: CustomHeader,
      headerComponentParams: { control: control },
      cellRenderer: CustomCell,
      ...defaultColDefProp,
    }),
    [control, defaultColDefProp]
  );

  const onGridReady = useCallback(
    (params: GridReadyEvent) => {
      if (control?.gridApiRef) {
        control.gridApiRef.current = params.api;
      }
    },
    [control]
  );

  const getRowClass = useCallback((params: RowClassParams) => {
    if (params.node.rowIndex === 0 || (params.node.rowIndex && params.node.rowIndex % 2 === 0)) {
      return 'ag-grid-even-row';
    } else {
      return 'ag-grid-odd-row';
    }
  }, []);

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
        gridOptions={{
          localeText: {
            noRowsToShow: t('table.noData'),
          },
        }}
        rowData={control?.data ?? []}
        defaultColDef={defaultColDef}
        headerHeight={50}
        rowHeight={rowHeight}
        onGridReady={onGridReady}
        enableCellTextSelection={true}
        ensureDomOrder={true}
        loadingOverlayComponent={CustomLoading}
        getRowClass={getRowClass}
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
      borderRight: '1px solid rgba(204, 204, 204, 1)',
    },

    '& .ag-header-cell:last-child': {
      borderRight: '1px solid rgba(255, 255, 255, 1) !important',
    },

    '& .ag-cell': {
      alignContent: 'center !important',
      borderRight: '1px solid rgba(204, 204, 204, 1) !important',
      lineHeight: '1.5 !important',
    },

    '& .ag-cell:last-child': {
      borderRight: '1px solid rgba(255, 255, 255, 1) !important',
    },

    '& .ag-cell-edit-wrapper': {
      padding: '8px',
    },
  })
);

const AddNewHeader = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Stack>
      <IconButton
        width={30}
        height={30}
        sx={{
          borderRadius: '8px',
          backgroundColor: 'rgba(0, 215, 45, 0.8)',
        }}
        icon={<AddIcon sx={{ color: 'rgba(0, 0, 0, 1)' }} />}
        onClick={onClick}
      />
    </Stack>
  );
};

export { AddNewHeader };

export default GridTable;
