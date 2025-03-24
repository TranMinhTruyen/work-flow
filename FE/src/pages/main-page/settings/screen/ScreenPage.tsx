import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ColDef } from 'ag-grid-community';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useRightDrawer } from '@/common/context/types/rightDrawerTypes';
import { I18nEnum } from '@/common/enums/i18nEnum';
import useForm from '@/common/hooks/useForm';
import useTable from '@/common/hooks/useTable';
import { IPageRequest, IPageResponse } from '@/common/model/pageable';
import Button from '@/components/button/Button';
import IconButton from '@/components/button/IconButton';
import TextInput from '@/components/form/TextInput';
import PageGridTable from '@/components/table/PageGridTable';

import { searchAction } from './action/action';
import AddNewModal from './components/AddNewModal';
import EditModal from './components/EditModal';
import IScreenTableRow from './model/ScreenTableRow';
import ISearchScreenForm from './model/SearchScreenForm';
import ISearchScreenRequest from './model/SearchScreenRequest';
import ISearchScreenResponse from './model/SearchScreenResponse';

import './screen.css';

const ScreenPage = () => {
  const { control, pageable, onDataChange } = useTable<IScreenTableRow>();
  const { openDrawer } = useRightDrawer();
  const { control: formControl, handleSubmit } = useForm<ISearchScreenForm>({
    context: {
      language: I18nEnum.SCREEN_I18N,
    },
  });
  const { t } = useTranslation(I18nEnum.SCREEN_I18N);

  const onSearchAction = useCallback(
    async (searchCondition?: IPageRequest<ISearchScreenRequest>) => {
      const response: IPageResponse<ISearchScreenResponse[]> = await searchAction(searchCondition);
      if (response.result) {
        onDataChange(
          response.result.map(item => ({
            ...item,
          })),
          response
        );
      }
    },
    [onDataChange]
  );

  useEffect(() => {
    const searchCondition: IPageRequest<ISearchScreenRequest> = {
      ...pageable,
    };
    onSearchAction(searchCondition);
  }, [onSearchAction, pageable]);

  const handleClickSearch = useCallback(
    (formData: ISearchScreenForm) => {
      const searchCondition: IPageRequest<ISearchScreenRequest> = {
        condition: { ...formData },
        ...pageable,
      };
      onSearchAction(searchCondition);
    },
    [onSearchAction, pageable]
  );

  const handleEdit = useCallback(
    (rowData: IScreenTableRow) => () => {
      openDrawer({
        isOnClose: true,
        onCloseAction: () => {
          onSearchAction({ ...pageable });
        },
        content: <EditModal data={rowData} />,
      });
    },
    [onSearchAction, openDrawer, pageable]
  );

  const handleAddNew = useCallback(() => {
    openDrawer({
      isOnClose: true,
      width: '500px',
      onCloseAction: () => {
        onSearchAction({ ...pageable });
      },
      content: <AddNewModal />,
    });
  }, [onSearchAction, openDrawer, pageable]);

  const colDefs = useMemo<ColDef<IScreenTableRow>[]>(
    () => [
      {
        headerName: 'Screen ID',
        field: 'screenId',
        width: 180,
        cellRenderer: (params: { value: string }) => {
          return <Typography sx={{ color: 'rgba(255, 0, 0, 1)' }}>{params.value}</Typography>;
        },
      },
      {
        headerName: 'Screen name',
        field: 'screenName',
        flex: 1,
      },
      {
        headerName: 'Screen URL',
        field: 'screenUrl',
        flex: 1,
      },
      {
        headerName: 'Created datetime',
        field: 'createDatetime',
        width: 200,
      },
      {
        headerName: 'Created by',
        field: 'createdBy',
        width: 150,
      },
      {
        headerName: 'Updated datetime',
        field: 'updateDatetime',
        width: 200,
      },
      {
        headerName: 'Updated by',
        field: 'updatedBy',
        width: 150,
      },
      {
        headerName: 'Status',
        field: 'active',
        sortable: false,
        width: 150,
        cellRenderer: (params: { data: IScreenTableRow; value: boolean }) => {
          return (
            <Stack sx={{ justifySelf: 'center' }}>
              <Typography
                sx={{
                  color: params.value ? 'rgba(0, 225, 0, 1)' : 'rgba(255, 0, 0, 1)',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}
              >
                {params.value ? 'Active' : 'Deactive'}
              </Typography>
            </Stack>
          );
        },
      },
      {
        colId: 'addNew',
        sortable: false,
        width: 80,
        headerComponent: AddNewHeader,
        headerComponentParams: { onClick: handleAddNew },
        cellRenderer: (params: { data: IScreenTableRow; value: boolean }) => {
          return (
            <Stack sx={{ justifySelf: 'center' }}>
              <IconButton
                className={'editButtons'}
                width={30}
                height={30}
                icon={<EditIcon sx={{ color: 'rgba(0, 0, 0, 1)' }} />}
                onClick={handleEdit(params.data)}
              />
            </Stack>
          );
        },
      },
    ],
    [handleAddNew, handleEdit]
  );

  return (
    <Stack spacing={2}>
      {/* Screen header */}
      <Stack direction={'row'} spacing={2}>
        <Typography sx={styles.title}>{t('title')}</Typography>
      </Stack>

      {/* Search form */}
      <form id={'search-screen-form'} onSubmit={handleSubmit(handleClickSearch)}>
        <Stack direction={'row'} spacing={2}>
          <TextInput name={'screenId'} control={formControl} sx={styles.textInput} />
          <TextInput name={'screenName'} control={formControl} sx={styles.textInput} />
          <TextInput name={'screenUrl'} control={formControl} sx={styles.textInput} />

          <Stack direction={'row'} spacing={2} sx={{ alignSelf: 'center' }}>
            <Button
              label={<Typography sx={styles.buttonLabel}>{t('button.search')}</Typography>}
              startIcon={<SearchIcon />}
              sx={styles.button}
              form={'search-screen-form'}
              type={'submit'}
            />

            <Button
              label={<Typography sx={styles.buttonLabel}>{t('button.clear')}</Typography>}
              sx={styles.button}
            />
          </Stack>
        </Stack>
      </form>

      {/* List screen table */}
      <Stack>
        <PageGridTable height={'75vh'} maxHeight={'75vh'} columnDefs={colDefs} control={control} />
      </Stack>
    </Stack>
  );
};

const AddNewHeader = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Stack>
      <IconButton
        className={'addButton'}
        width={30}
        height={30}
        icon={<AddIcon sx={{ color: 'rgba(0, 0, 0, 1)' }} />}
        onClick={onClick}
      />
    </Stack>
  );
};

const styles = {
  title: {
    fontSize: '16px !important',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  textInput: {
    width: '290px',
    maxWidth: '290px',
  },

  button: {
    minWidth: '110px',
    backgroundColor: 'rgba(0, 170, 255, 0.8)',
    height: '30px',
  },

  buttonLabel: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
};

export default memo(ScreenPage);
