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
import { memo, useMemo } from 'react';
import TableContainer from '@mui/material/TableContainer';
import { Paper } from '@mui/material';

type ApiErrorDetailProps = {
  status?: any;
  message?: string;
  responseData?: IBaseResponse;
};

const useStyles = makeStyles({
  tableHeader: {
    fontWeight: 'bold',
  },
});

const ApiErrorDetail = (props: ApiErrorDetailProps) => {
  const { status, message, responseData } = props;
  const classes = useStyles();

  const error = useMemo(() => {
    if (responseData?.errorList) {
      return Object.entries(responseData.errorList).map(([key, value], index) => (
        <TableRow key={index}>
          <TableCell>{key}</TableCell>
          <TableCell>{value}</TableCell>
        </TableRow>
      ));
    } else {
      return [];
    }
  }, [responseData?.errorList]);

  return (
    <Container>
      <Stack spacing={1}>
        <Typography>
          Status: {status} {message}
        </Typography>

        <Paper variant={'outlined'}>
          <TableContainer sx={{ maxHeight: 300 }}>
            <Table stickyHeader size={'small'}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography className={classes.tableHeader}>Error code</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className={classes.tableHeader}>Error message</Typography>
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

export default memo(ApiErrorDetail);
