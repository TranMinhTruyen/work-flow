import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ColDef } from 'ag-grid-community';
import { memo, useCallback, useEffect, useMemo } from 'react';

import { I18nEnum } from '@/common/enums/i18nEnum';
import useForm from '@/common/hooks/useForm';
import useTable from '@/common/hooks/useTable';
import useWebSocket from '@/common/hooks/useWebSocket';
import { IPageRequest, IPageResponse } from '@/common/model/Pageable';
import SubmitButton from '@/components/button/SubmitButton';
import DatePickerInput from '@/components/form/DatePickerInput';
import SwitchInput from '@/components/form/SwitchInput';
import TextInput from '@/components/form/TextInput';
import { openSnackBarContainer } from '@/components/snackbar/SnackBarContainer';
import PageGridTable from '@/components/table/PageGridTable';

import IEditModalForm from '../../model/EditModalForm';
import ISaveScreenResponse from '../../model/SaveScreenResponse';
import IScreenTableRow from '../../model/ScreenTableRow';
import IScreenUserRequest from '../../model/ScreenUserRequest';
import IScreenUserResponse from '../../model/ScreenUserResponse';
import IScreenUserTableRow from '../../model/ScreenUserTableRow';
import ISearchScreenRequest from '../../model/SearchScreenRequest';
import { getScreenDetail, getScreenUsers, saveAction } from './action';

import './editModal.css';

type EditModalProps = {
  data: IScreenTableRow;
};

const EditModal = (props: EditModalProps) => {
  const { data } = props;

  const { control, pageable, onDataChange, gridApiRef } = useTable<IScreenUserTableRow>();
  const {
    control: formControl,
    reset,
    getValues,
  } = useForm<IEditModalForm>({
    context: {
      language: I18nEnum.EDIT_SCREEN_I18N,
    },
  });

  // Check status screen via websocket.
  useWebSocket<ISaveScreenResponse>({
    receiveUrl: '/screen-master/change',
    onSubscribe: (data: ISaveScreenResponse) => {
      if (data.updatedDatetime !== getValues('updatedDatetime')) {
        openSnackBarContainer({
          severity: 'warning',
          message: 'Please reload screen!',
        });
      }
    },
  });

  const onGetScreenUser = useCallback(
    async (searchCondition?: IPageRequest<IScreenUserRequest>) => {
      gridApiRef.current?.setGridOption('loading', true);
      const userResponse: IPageResponse<IScreenUserResponse> =
        await getScreenUsers(searchCondition);
      if (userResponse.result && userResponse.result.length > 0) {
        onDataChange(userResponse.result, userResponse);
      }
      gridApiRef.current?.setGridOption('loading', false);
    },
    [gridApiRef, onDataChange]
  );

  const handleGetScreenDetail = useCallback(async () => {
    const screenResponse = await getScreenDetail(data.screenId);
    reset({ ...screenResponse });
  }, [data.screenId, reset]);

  /**
   * Init action get screen detail.
   */
  useEffect(() => {
    handleGetScreenDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Init action for user table and call search when change sort.
   */
  useEffect(() => {
    const searchCondition: IPageRequest<ISearchScreenRequest> = {
      condition: { screenId: data.screenId },
      ...pageable,
    };
    onGetScreenUser(searchCondition);
  }, [data, onGetScreenUser, pageable]);

  const handleSaveAction = useCallback(async () => {
    const formValue = getValues();
    const saveResponse = await saveAction({ ...formValue });
    if (saveResponse) {
      openSnackBarContainer({
        severity: 'success',
        message: 'Save screen success',
      });
      const response = await getScreenDetail(saveResponse.screenId);
      reset({ ...response });
    }
  }, [getValues, reset]);

  const colDefs = useMemo<ColDef<IScreenUserTableRow>[]>(
    () => [
      {
        headerName: 'User ID',
        field: 'userId',
        width: 200,
        cellRenderer: (params: { value: string }) => {
          return <Typography sx={{ color: 'rgba(255, 0, 0, 1)' }}>{params.value}</Typography>;
        },
      },
      {
        headerName: 'Email',
        field: 'email',
        width: 200,
      },
      {
        headerName: 'Username',
        field: 'userName',
        width: 200,
      },
      {
        headerName: 'Fullname',
        field: 'fullName',
        flex: 1,
      },
      {
        colId: 'addNew',
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
            <TextInput name={'screenId'} control={formControl} sx={styles.textInput} disabled />
            <TextInput name={'screenName'} control={formControl} sx={styles.textInput} required />
          </Stack>

          <Stack spacing={3}>
            <DatePickerInput
              inputFormat={'YYYY-MM-DD HH:mm:ss'}
              name={'createdDatetime'}
              control={formControl}
              width={290}
              disabled
            />
            <TextInput name={'screenUrl'} control={formControl} sx={styles.textInput} required />
          </Stack>

          <Stack spacing={3}>
            <DatePickerInput
              inputFormat={'YYYY-MM-DD HH:mm:ss'}
              name={'updatedDatetime'}
              control={formControl}
              width={290}
              disabled
            />
            <SwitchInput name={'active'} control={formControl} label={'Status'} />
          </Stack>
        </Stack>

        <Typography id={'editModalTitle'}>User using</Typography>

        <PageGridTable height={'50vh'} maxHeight={'50vh'} columnDefs={colDefs} control={control} />

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
