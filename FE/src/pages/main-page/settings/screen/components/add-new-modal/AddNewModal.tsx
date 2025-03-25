import Stack from '@mui/material/Stack';
import { memo, useCallback } from 'react';

import { I18nEnum } from '@/common/enums/i18nEnum';
import useForm from '@/common/hooks/useForm';
import SubmitButton from '@/components/button/SubmitButton';
import TextInput from '@/components/form/TextInput';

import { saveAction } from '../../action/action';
import IAddNewModalForm from '../../model/AddNewModalForm';

import './addNewModal.css';

const AddNewModal = () => {
  const { control, getValues } = useForm<IAddNewModalForm>({
    context: {
      language: I18nEnum.ADD_NEW_SCREEN_I18N,
    },
  });

  const handleSaveAction = useCallback(async () => {
    const formValue = getValues();
    await saveAction({ ...formValue });
  }, [getValues]);

  return (
    <form id={'add-new-screen-form'}>
      <Stack spacing={2} sx={{ paddingTop: '8px' }}>
        <Stack spacing={3} sx={{ marginLeft: 'auto !important', marginRight: 'auto !important' }}>
          <TextInput name={'screenId'} control={control} sx={styles.textInput} required />
          <TextInput name={'screenName'} control={control} sx={styles.textInput} required />
          <TextInput name={'screenUrl'} control={control} sx={styles.textInput} required />
          <TextInput
            name={'note'}
            control={control}
            sx={{
              ...styles.textInput,
              '& .MuiOutlinedInput-root': {
                height: '110px !important',
                '& fieldset': {
                  borderRadius: '25px',
                },
              },
            }}
            multiline
            maxRows={4}
          />
        </Stack>

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
    width: 500,
    maxWidth: 500,
  },
};

export default memo(AddNewModal);
