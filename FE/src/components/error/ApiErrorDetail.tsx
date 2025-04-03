import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ColDef } from 'ag-grid-community';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { I18nEnum } from '@/common/enums/i18nEnum';
import useTable from '@/common/hooks/useTable';
import { IBaseResponse, IErrorList } from '@/common/model/AxiosData';

import GridTable from '../table/GridTable';

type ApiErrorDetailProps = {
  status?: any;
  message?: string;
  responseData?: IBaseResponse;
};

const ApiErrorDetail = (props: ApiErrorDetailProps) => {
  const { status, message, responseData } = props;
  const { t } = useTranslation(I18nEnum.COMMON_I18N);
  const { control, onDataChange } = useTable<IErrorList>();

  useEffect(() => {
    if (responseData?.errorList && responseData.errorList.length > 0) {
      onDataChange(responseData.errorList);
    }
  }, [onDataChange, responseData]);

  const colDefs = useMemo<ColDef<IErrorList>[]>(
    () => [
      {
        headerName: t('errorcode'),
        field: 'errorCode',
        sortable: false,
        width: 125,
        cellRenderer: (params: { value: string }) => {
          return <Typography sx={{ color: 'rgba(255, 0, 0, 1)' }}>{params.value}</Typography>;
        },
      },
      {
        headerName: t('errormessage'),
        field: 'errorMessage',
        sortable: false,
        flex: 1,
        wrapText: true,
      },
    ],
    [t]
  );

  const errorTable = useMemo(() => {
    if (status !== 500) {
      return <GridTable columnDefs={colDefs} control={control} />;
    }
  }, [colDefs, control, status]);

  return (
    <Container>
      <Stack spacing={1}>
        <Typography
          sx={{
            color: 'rgba(225, 0, 0, 1)',
            fontSize: '16px !important',
            marginRight: 'auto !important',
          }}
        >
          {status} {message}
        </Typography>
        {errorTable}
      </Stack>
    </Container>
  );
};

export default ApiErrorDetail;
