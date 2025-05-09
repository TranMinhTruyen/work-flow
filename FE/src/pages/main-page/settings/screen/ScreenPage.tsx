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
import { IPageRequest, IPageResponse } from '@/common/model/Pageable';
import Button from '@/components/button/Button';
import IconButton from '@/components/button/IconButton';
import TextInput from '@/components/form/TextInput';
import PageGridTable from '@/components/table/PageGridTable';
import { AddNewHeader } from '@/components/table/components/CustomHeader';

import { searchAction } from './action';
import AddNewModal from './components/add-new-modal/AddNewModal';
import EditModal from './components/edit-modal/EditModal';
import IScreenTableRow from './model/form/ScreenTableRow';
import ISearchScreenForm from './model/form/SearchScreenForm';
import ISearchScreenRequest from './model/request/SearchScreenRequest';
import ISearchScreenResponse from './model/response/SearchScreenResponse';

import './screen.css';

const ScreenPage = () => {
  const { control, pageable, onDataChange, onSetLoading } = useTable<IScreenTableRow>();
  const { openDrawer } = useRightDrawer();
  const { t } = useTranslation(I18nEnum.SCREEN_I18N);
  const { control: formControl, handleSubmit } = useForm<ISearchScreenForm>({
    context: {
      language: I18nEnum.SCREEN_I18N,
    },
  });

  /**
   *  Call api search and set data for result.
   */
  const onSearchAction = useCallback(
    async (searchCondition?: IPageRequest<ISearchScreenRequest>) => {
      onSetLoading(true);
      const response: IPageResponse<ISearchScreenResponse> = await searchAction(searchCondition);
      if (response.result && response.total > 0) {
        onDataChange(response.result, response);
      }
      onSetLoading(false);
    },
    [onDataChange, onSetLoading]
  );

  /**
   * Init action and call search when change sort.
   */
  useEffect(() => {
    const searchCondition: IPageRequest<ISearchScreenRequest> = {
      ...pageable,
    };
    onSearchAction(searchCondition);
  }, [onSearchAction, pageable]);

  /**
   * Handle click button search.
   */
  const handleClickSearch = useCallback(
    (formData?: ISearchScreenForm) => {
      const searchCondition: IPageRequest<ISearchScreenRequest> = {
        condition: { ...formData },
        ...pageable,
      };
      onSearchAction(searchCondition);
    },
    [onSearchAction, pageable]
  );

  /**
   * Handle click edit screen button.
   */
  const handleEditScreen = useCallback(
    (rowData: IScreenTableRow) => () => {
      openDrawer({
        isOnClose: true,
        title: `${I18nEnum.EDIT_SCREEN_I18N}:title`,
        onCloseAction: () => {
          onSearchAction({ ...pageable });
        },
        content: <EditModal data={rowData} />,
      });
    },
    [onSearchAction, openDrawer, pageable]
  );

  /**
   * Handle click add new screen button.
   */
  const handleAddNewScreen = useCallback(() => {
    openDrawer({
      isOnClose: true,
      width: '525px',
      title: `${I18nEnum.ADD_NEW_SCREEN_I18N}:title`,
      onCloseAction: () => {
        onSearchAction({ ...pageable });
      },
      content: <AddNewModal />,
    });
  }, [onSearchAction, openDrawer, pageable]);

  // Configuration column for search result table.
  const colDefs = useMemo<ColDef<IScreenTableRow>[]>(
    () => [
      {
        headerName: t('table.screenId'),
        field: 'screenId',
        width: 180,
        cellRenderer: (params: { value: string }) => {
          return <Typography sx={{ color: 'rgba(255, 0, 0, 1)' }}>{params.value}</Typography>;
        },
      },
      {
        headerName: t('table.screenName'),
        field: 'screenName',
        minWidth: 250,
        flex: 1,
      },
      {
        headerName: t('table.screenUrl'),
        field: 'screenUrl',
        minWidth: 250,
        flex: 1,
      },
      {
        headerName: t('table.createdDatetime'),
        field: 'createdDatetime',
        width: 200,
      },
      {
        headerName: t('table.createdBy'),
        field: 'createdBy',
        minWidth: 175,
        flex: 1,
        cellRenderer: (params: { value: string }) => {
          return <Typography sx={{ justifySelf: 'center' }}>{params.value}</Typography>;
        },
      },
      {
        headerName: t('table.updatedDatetime'),
        field: 'updatedDatetime',
        width: 200,
      },
      {
        headerName: t('table.updatedBy'),
        field: 'updatedBy',
        minWidth: 175,
        flex: 1,
        cellRenderer: (params: { value: string }) => {
          return <Typography sx={{ justifySelf: 'center' }}>{params.value}</Typography>;
        },
      },
      {
        headerName: t('table.status'),
        field: 'active',
        sortable: false,
        width: 150,
        cellRenderer: (params: { data: IScreenTableRow; value: boolean }) => {
          return (
            <Typography
              sx={{
                color: params.value ? 'rgba(0, 225, 0, 1)' : 'rgba(255, 0, 0, 1)',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                justifySelf: 'center',
              }}
            >
              {params.value ? 'Active' : 'Deactive'}
            </Typography>
          );
        },
      },
      {
        colId: 'addNew',
        sortable: false,
        width: 80,
        headerComponent: AddNewHeader,
        headerComponentParams: { onClick: handleAddNewScreen },
        cellRenderer: (params: { data: IScreenTableRow }) => {
          return (
            <Stack sx={{ justifySelf: 'center' }}>
              <IconButton
                className={'editButtons'}
                width={30}
                height={30}
                icon={<EditIcon sx={{ color: 'rgba(0, 0, 0, 1)' }} />}
                onClick={handleEditScreen(params.data)}
              />
            </Stack>
          );
        },
      },
    ],
    [handleAddNewScreen, handleEditScreen, t]
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
              label={t('button.search')}
              startIcon={<SearchIcon />}
              sx={styles.button}
              form={'search-screen-form'}
              type={'submit'}
            />

            <Button label={t('button.clear')} sx={styles.button} />
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
    width: 'auto',
    minWidth: '70px',
    backgroundColor: 'rgba(0, 170, 255, 0.8)',
  },
};

export default memo(ScreenPage);
