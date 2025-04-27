import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { memo, useCallback } from 'react';

import { I18nEnum } from '@/common/enums/i18nEnum';
import useForm from '@/common/hooks/useForm';
import SubmitButton from '@/components/button/SubmitButton';
import TextInput from '@/components/form/TextInput';

import IAddNewModalForm from '../../model/form/AddNewModalForm';
import { saveAction } from './action';

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
    <>
      {/* Modal body */}
      <Stack
        sx={{
          padding: '16px',
          overflow: 'auto',
          minHeight: 'calc(100vh - 147px)',
        }}
      >
        <form id={'add-new-screen-form'}>
          <Stack spacing={3} sx={{ alignItems: 'center' }}>
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
        </form>
      </Stack>

      <Divider />

      {/* Modal footer */}
      <Stack direction={'row-reverse'} spacing={1} sx={{ height: '45px', padding: '8px' }}>
        <SubmitButton onSubmit={handleSaveAction} />
      </Stack>
    </>
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
