import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ChangeEvent, useCallback } from 'react';

import GridTable, { GridTableProps } from './GridTable';

export type PageGridTableProps = GridTableProps & {};

const PageGridTable = (props: PageGridTableProps) => {
  const { ...restProps } = props;

  const handlePageChange = useCallback(
    (_event: ChangeEvent<unknown>, page: number) => {
      props.control?.onPageChange(page);
    },
    [props]
  );

  return (
    <Stack spacing={1}>
      <Stack direction={'row'} spacing={2} sx={{ marginLeft: 'auto !important' }}>
        <Pagination
          count={props.control?.totalPages}
          showFirstButton
          showLastButton
          color={'primary'}
          onChange={handlePageChange}
        />
        <Typography>{`Total: ${props.control?.total}`}</Typography>
        <Typography>{`Page ${props.control?.page} of ${props.control?.totalPages}`}</Typography>
      </Stack>
      <GridTable {...restProps} />
    </Stack>
  );
};

export default PageGridTable;
