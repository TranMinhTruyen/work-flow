import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ReactNode } from 'react';

export type Cell = {
  name: string;
  data?: ReactNode;
  width?: number;
  hideData?: boolean;
};

export type Column = {
  height?: number;
  columns: Cell[];
};

export type Row = {
  height: number;
  cells: Cell[];
};

export type TableProps = {
  width?: number | string;
  height?: number | string;
  column: Column;
  rows?: Row[];
};

// TODO Custom table component
const GridTable = (props: TableProps) => {
  const { width = '100%', height, column, rows = [] } = props;
  const columnSize = column.columns.length;
  return (
    <Paper variant={'outlined'}>
      <TableContainer>
        <Table stickyHeader size={'small'} sx={{ tableLayout: 'fixed', width: width }}>
          <TableHead>
            <TableRow>
              {column.columns.map((item, index) => {
                const isLast = index === columnSize - 1;
                let cellWidth = 100;
                if (!isLast && item.width !== undefined) {
                  cellWidth = item.width;
                }
                return (
                  <TableCell
                    key={item.name}
                    sx={{
                      width: isLast ? 'auto' : cellWidth,
                      height: column.height ?? 40,
                      padding: 1,
                      borderLeft: index !== 0 ? '1px solid rgba(224, 224, 224, 1)' : '',
                    }}
                  >
                    {item.hideData !== undefined && item.hideData === true ? null : item.data}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default GridTable;
