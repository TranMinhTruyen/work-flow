'use client';
import { IBaseResponse } from '@/model/common/BaseResponse';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import TableContainer from '@mui/material/TableContainer';
import { Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { I18nEnum } from '@/common/enums/I18nEnum';

type ApiErrorDetailProps = {
  status?: any;
  message?: string;
  responseData?: IBaseResponse;
};

const ApiErrorDetail = (props: ApiErrorDetailProps) => {
  const { status, message, responseData } = props;
  const { t } = useTranslation(I18nEnum.COMMON_I18N);

  const tableBody = useMemo(() => {
    if (responseData?.errorList && Object.entries(responseData.errorList).length > 0) {
      return Object.entries(responseData.errorList).map(([key, value], index) => (
        <TableRow key={index}>
          <TableCell sx={{ textAlign: 'center' }}>{key}</TableCell>
          <TableCell sx={{ borderLeft: '1px solid rgba(224, 224, 224, 1)', textAlign: 'left' }}>
            {value}
          </TableCell>
        </TableRow>
      ));
    } else {
      return (
        <TableRow>
          <TableCell colSpan={2} sx={{ textAlign: 'center' }}>
            {t('table.noData')}
          </TableCell>
        </TableRow>
      );
    }
  }, [responseData?.errorList, t]);

  return (
    <Container>
      <Stack spacing={1}>
        <Typography variant={'h5'} component={'span'} sx={{ color: 'rgba(225, 0, 0, 1)' }}>
          {status} {message}
        </Typography>

        <Paper variant={'outlined'}>
          <TableContainer sx={{ maxHeight: 300 }}>
            <Table stickyHeader size={'small'}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 140, textAlign: 'center' }}>
                    <Typography>{t('errorcode')}</Typography>
                  </TableCell>
                  <TableCell
                    sx={{ borderLeft: '1px solid rgba(224, 224, 224, 1)', textAlign: 'center' }}
                  >
                    <Typography>{t('errormessage')}</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{tableBody}</TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Stack>
    </Container>
  );
};

export default ApiErrorDetail;
