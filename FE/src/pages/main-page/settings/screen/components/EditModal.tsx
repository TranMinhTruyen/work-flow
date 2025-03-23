import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ColDef } from 'ag-grid-community';
import { memo, useCallback, useEffect, useMemo } from 'react';

import { useRightDrawer } from '@/common/context/types/rightDrawerTypes';
import useForm from '@/common/hooks/useForm';
import IconButton from '@/components/button/IconButton';
import SubmitButton from '@/components/button/SubmitButton';
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
    <Stack spacing={2} sx={{ padding: '16px' }}>
      <Stack sx={styles.header} direction={'row'}>
        <Stack sx={{ flex: 1, marginLeft: '30px' }}>
          <Typography variant={'h4'}>EDIT SCREEN</Typography>
        </Stack>
        <Stack>
          <IconButton
            width={30}
            height={30}
            onClick={closeDrawer}
            icon={<CloseIcon sx={{ color: 'rgba(0, 0, 0, 1)' }} />}
          />
        </Stack>
      </Stack>

      <Divider />
      <Typography id={'editModalTitle'}>Detail</Typography>

      <form id={'edit-screen-form'}>
        <Stack spacing={3} direction={'row'} sx={{ justifyContent: 'space-between' }}>
          <Stack spacing={3}>
            <TextInput name={'screenId'} control={control} sx={styles.textInput} disabled />
            <TextInput name={'screenName'} control={control} sx={styles.textInput} required />
          </Stack>

          <Stack spacing={3}>
            <TextInput name={'createDatetime'} control={control} sx={styles.textInput} disabled />
            <TextInput name={'screenUrl'} control={control} sx={styles.textInput} required />
          </Stack>

          <Stack spacing={3}>
            <TextInput name={'updateDatetime'} control={control} sx={styles.textInput} disabled />
            <SwitchInput name={'active'} control={control} label={'Status'} />
          </Stack>
        </Stack>

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
          <SubmitButton onSubmit={handleSaveAction} />
        </Stack>
      </form>
    </Stack>
  );
};

const styles = {
  header: {
    alignItems: 'center',
  },

  textInput: {
    width: 290,
    maxWidth: 290,
  },
};

export default memo(EditModal);
