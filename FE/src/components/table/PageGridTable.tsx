import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { I18nEnum } from '@/common/enums/i18nEnum';
import { formatString } from '@/common/utils/stringUtil';

import GridTable, { GridTableProps } from './GridTable';

export type PageGridTableProps = GridTableProps & {};

const PageGridTable = (props: PageGridTableProps) => {
  const { control, ...restProps } = props;
  const { t } = useTranslation(I18nEnum.COMMON_I18N);

  const handlePageChange = useCallback(
    (_event: ChangeEvent<unknown>, page: number) => {
      control?.onPageChange(page);
    },
    [control]
  );

  const handleSizeChange = useCallback(
    (event: SelectChangeEvent) => {
      control?.onSizeChange(Number(event.target.value));
    },
    [control]
  );

  return (
    <Stack spacing={1}>
      {/* Table area */}
      <GridTable control={control} {...restProps} />

      {/* Paging area */}
      <Stack direction={'row'} spacing={2} sx={{ marginLeft: 'auto !important' }}>
        <Typography>
          {formatString(
            t('table.showTotalData'),
            control?.paginationInfo?.from ?? '',
            control?.paginationInfo?.to ?? '',
            control?.paginationInfo?.total ?? ''
          )}
        </Typography>
        <Pagination
          page={control?.paginationInfo?.page}
          count={control?.paginationInfo?.totalPages}
          showFirstButton
          showLastButton
          color={'primary'}
          onChange={handlePageChange}
        />
        <FormControl size={'small'} sx={{ alignSelf: 'center' }}>
          <Select
            sx={{ height: '30px', borderRadius: '50px' }}
            value={control?.paginationInfo?.size as unknown as string}
            onChange={handleSizeChange}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        <Typography>
          {formatString(
            t('table.pageInfo'),
            control?.paginationInfo?.page ?? '',
            control?.paginationInfo?.totalPages ?? ''
          )}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PageGridTable;
