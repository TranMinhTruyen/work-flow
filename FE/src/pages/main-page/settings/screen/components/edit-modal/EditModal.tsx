import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { I18nEnum } from '@/common/enums/i18nEnum';
import useForm from '@/common/hooks/useForm';
import useWebSocket from '@/common/hooks/useWebSocket';
import { selectLoginData } from '@/common/store/commonSlice';
import SubmitButton from '@/components/button/SubmitButton';
import DatePickerInput from '@/components/form/DatePickerInput';
import SwitchInput from '@/components/form/SwitchInput';
import TextInput from '@/components/form/TextInput';
import { useAppSelector } from '@/lib/store';

import IEditModalForm from '../../model/EditModalForm';
import ISaveScreenResponse from '../../model/SaveScreenResponse';
import IScreenTableRow from '../../model/ScreenTableRow';
import { getScreenDetail, saveAction } from './action';
import ScreenUserTable from './ScreenUserTable';

import './editModal.css';

type EditModalProps = {
  data: IScreenTableRow;
};

const EditModal = (props: EditModalProps) => {
  const { data } = props;

  const { t } = useTranslation(I18nEnum.EDIT_SCREEN_I18N);
  const { control, reset, getValues } = useForm<IEditModalForm>({
    context: {
      language: I18nEnum.EDIT_SCREEN_I18N,
    },
  });

  const loginData = useAppSelector(selectLoginData);

  // Check status screen via websocket.
  useWebSocket<ISaveScreenResponse>({
    receiveUrl: '/screen-master/change',
    onSubscribe: (data: ISaveScreenResponse) => {
      if (data.updatedBy !== loginData?.userName) {
        toast.warning(<Typography>Please reload screen!</Typography>);
      }
    },
  });

  const onGetScreenDetail = useCallback(async () => {
    const screenResponse = await getScreenDetail(data.screenId);
    reset({ ...screenResponse });
  }, [data.screenId, reset]);

  /**
   * Init action get screen detail.
   */
  useEffect(() => {
    onGetScreenDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Save screen action.
   */
  const handleSaveAction = useCallback(async () => {
    const formValue = getValues();
    const saveResponse = await saveAction({ ...formValue });
    if (saveResponse) {
      toast.success(<Typography>Save success</Typography>);
      const response = await getScreenDetail(saveResponse.screenId);
      reset({ ...response });
    }
  }, [getValues, reset]);

  return (
    <form id={'edit-screen-form'}>
      <Stack spacing={2}>
        <Typography id={'editModalTitle'}>{t('label.screenDetail')}</Typography>

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
            <SwitchInput name={'active'} control={control} />
          </Stack>
        </Stack>

        <ScreenUserTable screenId={data.screenId} />

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
