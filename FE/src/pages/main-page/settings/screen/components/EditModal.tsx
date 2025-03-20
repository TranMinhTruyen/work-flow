import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ColDef } from 'ag-grid-community';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { useRightDrawer } from '@/common/context/types/rightDrawerTypes';
import Button from '@/components/button/Button';
import SwitchInput from '@/components/form/SwitchInput';
import TextInput from '@/components/form/TextInput';
import GridTable from '@/components/table/GridTable';

import { getScreenDetail, saveAction } from '../action/action';
import IEditModalForm from '../model/EditModalForm';
import IScreenTableRow from '../model/ScreenTableRow';

type EditModalProps = {
  data: IScreenTableRow;
};

const EditModal = (props: EditModalProps) => {
  const { data } = props;

  const { closeDrawer } = useRightDrawer();
  const { control, reset, getValues } = useForm<IEditModalForm>();

  const handleGetScreenDetail = useCallback(async () => {
    const response = await getScreenDetail(data.screenId);
    reset({ ...response });
  }, [data.screenId, reset]);

  useEffect(() => {
    handleGetScreenDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveAction = useCallback(async () => {
    const formValue = getValues();
    const saveResponse = await saveAction({ ...formValue });
    const response = await getScreenDetail(saveResponse.screenId);
    reset({ ...response });
  }, [getValues, reset]);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      resizable: false,
      autoHeight: true,
    }),
    []
  );

  const colDefs = useMemo<ColDef[]>(
    () => [
      {
        headerName: 'User ID',
        field: 'userId',
        width: 250,
        cellRenderer: (params: { value: string }) => {
          return <Typography sx={{ color: 'rgba(255, 0, 0, 1)' }}>{params.value}</Typography>;
        },
      },
      {
        headerName: 'Username',
        field: 'userName',
        flex: 1,
        cellRenderer: (params: { value: string }) => {
          return <Typography sx={{ color: 'rgba(255, 0, 0, 1)' }}>{params.value}</Typography>;
        },
      },
      {
        headerName: '',
        width: 80,
        cellRenderer: () => {},
      },
    ],
    []
  );

  return (
    <Box>
      <Stack spacing={2} sx={{ padding: '16px' }}>
        <Stack sx={styles.header}>
          <Stack spacing={1} alignItems={'center'}>
            <Typography variant={'h4'}>EDIT SCREEN</Typography>
          </Stack>
          <IconButton onClick={closeDrawer} sx={{ position: 'absolute', right: 8 }}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Divider />
        <Typography id={'editModalTitle'}>Detail</Typography>

        <form id={'edit-screen-form'}>
          <Stack spacing={3} direction={'row'}>
            <Stack spacing={3}>
              <TextInput name={'screenId'} control={control} disabled />

              <TextInput name={'screenName'} control={control} required />
            </Stack>

            <Stack spacing={3}>
              <TextInput name={'createDatetime'} control={control} disabled />
              <TextInput name={'screenUrl'} control={control} required />
            </Stack>

            <Stack spacing={3}>
              <TextInput name={'updateDatetime'} control={control} disabled />
              <SwitchInput name={'active'} control={control} label={'Status'} />
            </Stack>
          </Stack>
        </form>

        <Divider />

        <Stack sx={{ marginTop: '0px !important' }}>
          <Typography id={'editModalTitle'}>User using</Typography>
          <GridTable
            height={'50vh'}
            maxHeight={'50vh'}
            defaultColDef={defaultColDef}
            columnDefs={colDefs}
            suppressMovableColumns
          />
        </Stack>

        <Divider />

        <Stack>
          <Button
            sx={styles.okButton}
            label={
              <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                {'Save'}
              </Typography>
            }
            onClick={handleSaveAction}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  okButton: {
    marginLeft: 'auto',
    backgroundColor: 'rgba(0, 170, 255, 0.8)',
  },
};

export default memo(EditModal);
