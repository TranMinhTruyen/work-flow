import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { memo, useCallback } from 'react';

import { useRightDrawer } from '@/common/context/types/rightDrawerTypes';
import useForm from '@/common/hooks/useForm';
import IconButton from '@/components/button/IconButton';
import SubmitButton from '@/components/button/SubmitButton';
import TextInput from '@/components/form/TextInput';

import { saveAction } from '../action/action';
import IAddNewModalForm from '../model/AddNewModalForm';

const AddNewModal = () => {
  const { closeDrawer } = useRightDrawer();
  const { control, handleSubmit } = useForm<IAddNewModalForm>();

  const handleSaveAction = useCallback(async (formData: IAddNewModalForm) => {
    await saveAction({ ...formData });
  }, []);

  return (
    <form id={'add-new-screen-form'} onSubmit={handleSubmit(handleSaveAction)}>
      <Stack spacing={2} sx={{ height: '100vh !important', padding: '16px' }}>
        <Stack sx={styles.header} direction={'row'}>
          <Stack sx={{ flex: 1, marginLeft: '30px' }}>
            <Typography variant={'h4'}>ADD NEW SCREEN</Typography>
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

        <Divider />

        <Stack>
          <SubmitButton form={'add-new-screen-form'} type={'submit'} />
        </Stack>
      </Stack>
    </form>
  );
};

const styles = {
  header: {
    alignItems: 'center',
  },

  textInput: {
    width: 450,
    maxWidth: 450,
  },
};

export default memo(AddNewModal);
