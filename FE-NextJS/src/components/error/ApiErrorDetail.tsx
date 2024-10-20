'use client';
import { IBaseResponse } from '@/common/api/baseResponse';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { memo, useMemo } from 'react';

type ApiErrorDetailProps = {
  status?: any;
  message?: string;
  responseData?: IBaseResponse;
};

const ApiErrorDetail = (props: ApiErrorDetailProps) => {
  const { status, message, responseData } = props;

  const error = useMemo(() => {
    if (responseData?.errorList) {
      return Object.entries(responseData.errorList).map(([key, value], index) => (
        <Stack key={`error${index}`} direction={'row'} spacing={1}>
          <Typography>{key}:</Typography>
          <Typography>{value}</Typography>
        </Stack>
      ));
    }
  }, [responseData?.errorList]);

  return (
    <Container>
      <Stack spacing={1}>
        <Typography>Status: {status}</Typography>
        <Typography>Message: {message}</Typography>
        <Typography>Error detail</Typography>
        {error}
      </Stack>
    </Container>
  );
};

export default memo(ApiErrorDetail);
