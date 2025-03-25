import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ColDef } from 'ag-grid-community';
import { memo, useCallback, useEffect, useMemo } from 'react';

import { I18nEnum } from '@/common/enums/i18nEnum';
import useForm from '@/common/hooks/useForm';
import SubmitButton from '@/components/button/SubmitButton';
import DatePickerInput from '@/components/form/DatePickerInput';
import SwitchInput from '@/components/form/SwitchInput';
import TextInput from '@/components/form/TextInput';
import GridTable from '@/components/table/GridTable';

import { getScreenDetail, saveAction } from '../../action/action';
import IEditModalForm from '../../model/EditModalForm';
import IScreenTableRow from '../../model/ScreenTableRow';

import './editModal.css';

type EditModalProps = {
  data: IScreenTableRow;
};

const EditModal = (props: EditModalProps) => {
  const { data } = props;

  const { control, reset, getValues } = useForm<IEditModalForm>({
    context: {
      language: I18nEnum.EDIT_SCREEN_I18N,
    },
  });

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
        sortable: false,
        width: 80,
        cellRenderer: () => {},
      },
    ],
    []
  );

  return (
    <form id={'edit-screen-form'}>
      <Stack spacing={2}>
        <Typography id={'editModalTitle'}>Screen detail</Typography>

        <Stack spacing={3} direction={'row'} sx={{ justifyContent: 'space-between' }}>
          <Stack spacing={3}>
            <TextInput name={'screenId'} control={control} sx={styles.textInput} disabled />
            <TextInput name={'screenName'} control={control} sx={styles.textInput} required />
          </Stack>

          <Stack spacing={3}>
            <DatePickerInput
              inputFormat={'YYYY-MM-DD HH:mm:ss'}
              name={'createdDatetime'}
              control={control}
              width={290}
              disabled
            />
            <TextInput name={'screenUrl'} control={control} sx={styles.textInput} required />
          </Stack>

          <Stack spacing={3}>
            <DatePickerInput
              inputFormat={'YYYY-MM-DD HH:mm:ss'}
              name={'updatedDatetime'}
              control={control}
              width={290}
              disabled
            />
            <SwitchInput name={'active'} control={control} label={'Status'} />
          </Stack>
        </Stack>

        <Typography id={'editModalTitle'}>User using</Typography>
        <GridTable
          height={'50vh'}
          maxHeight={'50vh'}
          defaultColDef={defaultColDef}
          columnDefs={colDefs}
          suppressMovableColumns
        />

        <SubmitButton onSubmit={handleSaveAction} />
      </Stack>
    </form>
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

  button: {
    width: '145px',
    backgroundColor: 'rgba(0, 170, 255, 0.8)',
    height: '40px',
  },
};

export default memo(EditModal);
