'use client';
import { IBaseResponse } from '@/model/common/BaseResponse';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';
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

const useStyles = makeStyles({
  tableCell: {
    borderLeft: '1px solid rgba(224, 224, 224, 1)',
  },
});

const ApiErrorDetail = (props: ApiErrorDetailProps) => {
  const { status, message, responseData } = props;
  const { t } = useTranslation(I18nEnum.COMMON_I18N);
  const classes = useStyles();

  const error = useMemo(() => {
    if (responseData?.errorList) {
      return Object.entries(responseData.errorList).map(([key, value], index) => (
        <TableRow key={index}>
          <TableCell>{key}</TableCell>
          <TableCell className={classes.tableCell}>{value}</TableCell>
        </TableRow>
      ));
    } else {
      return [];
    }
  }, [classes.tableCell, responseData?.errorList]);

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
                  <TableCell sx={{ width: 140 }}>
                    <Typography>{t('errorcode')}</Typography>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Typography>{t('errormessage')}</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{error}</TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Stack>
    </Container>
  );
};

export default ApiErrorDetail;
