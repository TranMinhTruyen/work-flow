import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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

  const handleSizeChange = useCallback(
    (event: SelectChangeEvent) => {
      props.control?.onSizeChange(Number(event.target.value));
    },
    [props]
  );

  return (
    <Stack spacing={1}>
      <Stack direction={'row'} spacing={2} sx={{ marginLeft: 'auto !important' }}>
        <Typography>{`Showing ${props.control?.pageable.from} to ${props.control?.pageable.to} of ${props.control?.pageable.total} entries`}</Typography>
        <Pagination
          page={props.control?.pageable.page}
          count={props.control?.pageable.totalPages}
          showFirstButton
          showLastButton
          color={'primary'}
          onChange={handlePageChange}
        />
        <FormControl size={'small'}>
          <Select
            sx={{ height: '35px', borderRadius: '50px' }}
            value={props.control?.pageable.size as unknown as string}
            onChange={handleSizeChange}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
        <Typography>{`Page ${props.control?.pageable.page} of ${props.control?.pageable.totalPages}`}</Typography>
      </Stack>
      <GridTable {...restProps} />
    </Stack>
  );
};

export default PageGridTable;
