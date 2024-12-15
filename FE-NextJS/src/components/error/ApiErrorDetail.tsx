'use client';
import { IBaseResponse } from '@/model/common/BaseResponse';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nEnum } from '@/common/enums/I18nEnum';
import { ColDef } from 'ag-grid-community';
import GridTable from '../table/Table';

type ApiErrorDetailProps = {
  status?: any;
  message?: string;
  responseData?: IBaseResponse;
};

type ErrorData = {
  errorCode: string;
  errorMessage: string;
};

const ApiErrorDetail = (props: ApiErrorDetailProps) => {
  const { status, message, responseData } = props;
  const { t } = useTranslation(I18nEnum.COMMON_I18N);

  const tableData = useMemo<ErrorData[]>(() => {
    if (responseData?.errorList && responseData.errorList.length > 0) {
      return responseData.errorList.map(item => ({
        errorCode: item.errorCode,
        errorMessage: item.errorMessage,
      }));
    }
    return [];
  }, [responseData?.errorList]);

  const colDefs = useMemo<ColDef<ErrorData>[]>(
    () => [
      {
        headerName: t('errorcode'),
        field: 'errorCode',
        width: 125,
        cellRenderer: (params: { value: string }) => {
          return <Typography sx={{ color: 'rgba(255, 0, 0, 1)' }}>{params.value}</Typography>;
        },
      },
      {
        headerName: t('errormessage'),
        field: 'errorMessage',
        flex: 1,
        wrapText: true,
      },
    ],
    [t]
  );

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

  return (
    <Container>
      <Stack spacing={1}>
        <Typography variant={'h5'} component={'span'} sx={{ color: 'rgba(225, 0, 0, 1)' }}>
          {status} {message}
        </Typography>
        <GridTable
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          rowData={tableData}
          suppressMovableColumns
        />
      </Stack>
    </Container>
  );
};

export default ApiErrorDetail;
