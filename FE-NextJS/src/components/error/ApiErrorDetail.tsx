import { Divider } from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { memo, useMemo } from 'react';

type ApiErrorDetailProps = {
  status?: any;
  message?: string;
  errorList?: Map<string, string>;
};

const ApiErrorDetail = (props: ApiErrorDetailProps) => {
  const { status, message, errorList } = props;

  const error = useMemo(() => {
    if (errorList) {
      return Object.entries(errorList).map(([key, value], index) => (
        <Stack key={`error${index}`} direction={'row'} spacing={1}>
          <Typography>{key}:</Typography>
          <Typography>{value}</Typography>
        </Stack>
      ));
    }
  }, [errorList]);

  return <Container>{error}</Container>;
};

export default memo(ApiErrorDetail);
