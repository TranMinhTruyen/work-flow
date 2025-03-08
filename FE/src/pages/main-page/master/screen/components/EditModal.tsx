import CloseIcon from '@mui/icons-material/Close';
import { Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ColDef } from 'ag-grid-community';
import { memo, Ref, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { ModalRef } from '@/common/hooks/types/useModalTypes';
import useModal from '@/common/hooks/useModal';
import Button from '@/components/button/Button';
import SwitchInput from '@/components/form/SwitchInput';
import TextInput from '@/components/form/TextInput';
import GridTable from '@/components/table/GridTable';

import { IEditModalForm } from '../model/editModalForm';
import { IScreenTableRow } from '../model/table';

type EditModalProps = {
  ref: Ref<ModalRef<null, IScreenTableRow>>;
};

const EditModal = (props: EditModalProps) => {
  const { ref } = props;

  const { inputValue, handleClose, handleOk, openModal } = useModal<null, IScreenTableRow>(ref);

  const { control } = useForm<IEditModalForm>({
    values: { ...inputValue },
  });

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
    <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth={'md'}>
      <Stack spacing={2} sx={{ padding: '16px' }}>
        <Stack sx={styles.header}>
          <Stack spacing={1} alignItems={'center'}>
            <Typography variant={'h4'}>EDIT SCREEN</Typography>
          </Stack>
          <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8 }}>
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
              <TextInput name={'createDateTime'} control={control} disabled />

              <TextInput name={'screenUrl'} control={control} required />
            </Stack>

            <Stack spacing={3}>
              <TextInput name={'updateDateTime'} control={control} disabled />
              <SwitchInput name={'active'} control={control} label={'Status'} />
            </Stack>
          </Stack>
        </form>

        <Divider />

        <Stack sx={{ marginTop: '0px !important' }}>
          <Typography id={'editModalTitle'}>User using</Typography>
          <GridTable defaultColDef={defaultColDef} columnDefs={colDefs} suppressMovableColumns />
        </Stack>

        <Divider />

        <Stack>
          <Button
            sx={styles.okButton}
            label={
              <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                {'OK'}
              </Typography>
            }
            onClick={handleOk}
          />
        </Stack>
      </Stack>
    </Dialog>
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
