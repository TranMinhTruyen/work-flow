'use client';
import { ICategory } from '@/app/(main)/kanban/model/Category';
import { CURRENT_PATH } from '@/common/constants/commonConst';
import Button from '@/components/button/Button';
import IconButton from '@/components/button/IconButton';
import SelectInput from '@/components/inputs/SelectInput';
import TextInput from '@/components/inputs/TextInput';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import Grid2 from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { NextPage } from 'next';
import { usePathname } from 'next/navigation';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Category from './components/Category';
import { assigneeSelect, issueTypeSelect, sampleData, statusTypeSelect } from './data/kanbanData';

const Kanban: NextPage = () => {
  const [state, setState] = useState<ICategory[]>([]);
  const [isShowFilter, setIsShowFilter] = useState<boolean>(true);
  const path = usePathname();

  useEffect(() => {
    setState(sampleData);
    sessionStorage.setItem(CURRENT_PATH, path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnDragEnd = useCallback((result: DropResult) => {
    if (result === undefined || result === null) return;

    const { source, destination } = result;

    if (
      source === undefined ||
      source === null ||
      destination === undefined ||
      destination === null
    ) {
      return;
    }

    const sInd = Number(source.droppableId ?? -1);
    const dInd = Number(destination.droppableId ?? -1);
    const sPos = Number(source.index ?? -1);
    const dPos = Number(destination.index ?? -1);

    if (sInd < 0 || dInd < 0) return;
    if (sPos < 0 || dPos < 0) return;
    if (sInd === dInd && sPos === dPos) return;

    // If drag in same column
    if (sInd === dInd) {
      setState(prevState => {
        const copiesTasks = prevState[sInd].content;

        const [removed] = copiesTasks.splice(sPos, 1);

        copiesTasks.splice(dPos, 0, removed);

        prevState[sInd].content = copiesTasks;
        return prevState;
      });
    } else {
      // Drag to another column
      setState(prevState => {
        const copiesTasksSource = prevState[sInd].content;
        const copiesTasksDestination = prevState[dInd].content;

        const [removed] = copiesTasksSource.splice(sPos, 1);

        copiesTasksDestination.splice(dPos, 0, removed);

        prevState[sInd].content = copiesTasksSource;
        prevState[dInd].content = copiesTasksDestination;
        return prevState;
      });
    }
  }, []);

  const onClickFilter = useCallback(() => {
    setIsShowFilter(prevState => !prevState);
  }, []);

  // Category column
  const category = useMemo(() => {
    if (state !== undefined && state !== null) {
      return state.map((item, index) => {
        return <Category key={`category-${item.id}`} categoryItem={item} index={index} />;
      });
    } else {
      return null;
    }
  }, [state]);

  const filter = useMemo(
    () =>
      isShowFilter ? (
        <Stack direction={'row'} spacing={2} alignItems={'center'}>
          <SelectInput
            displayNone
            data={issueTypeSelect}
            label={'Issue Type'}
            disabled={!isShowFilter}
            sx={styles.selectInput}
          />

          <SelectInput
            displayNone
            data={statusTypeSelect}
            label={'Status'}
            disabled={!isShowFilter}
            sx={styles.selectInput}
          />

          <SelectInput
            displayNone
            data={assigneeSelect}
            label={'Assignee'}
            disabled={!isShowFilter}
            sx={styles.selectInput}
          />

          <TextInput label={'Title'} disabled={!isShowFilter} sx={styles.textInput} />

          <IconButton icon={<SearchIcon />} disabled={!isShowFilter} sx={styles.searchButton} />
        </Stack>
      ) : undefined,
    [isShowFilter]
  );

  return (
    <Stack spacing={2} sx={{ paddingLeft: 2, height: '80vh' }}>
      <Stack direction={'row'} spacing={4} alignItems={'center'}>
        <Typography variant="h5" component="span">
          Kanban board
        </Typography>

        <Button
          onClick={onClickFilter}
          startIcon={isShowFilter ? <FilterAltOffIcon /> : <FilterAltIcon />}
          label={
            isShowFilter ? (
              <Typography sx={{ fontWeight: 'bold' }}>Hide filter</Typography>
            ) : (
              <Typography sx={{ fontWeight: 'bold' }}>Show filter</Typography>
            )
          }
          sx={styles.showFilterButton}
        />
      </Stack>

      {filter}

      <Grid2 spacing={2} container size={{ xs: 12 }}>
        <Grid2 size={{ xs: 12 }}>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Stack
              spacing={2}
              direction={'row'}
              divider={<Divider orientation={'vertical'} flexItem />}
            >
              {category}
            </Stack>
          </DragDropContext>
        </Grid2>
      </Grid2>
    </Stack>
  );
};

const styles = {
  showFilterButton: {
    width: 130,
    height: 30,
    backgroundColor: 'rgba(190, 190, 190, 0.8)',
  },

  selectInput: {
    '& .MuiInputBase-formControl': {
      height: '40px !important',
    },

    '& .MuiChip-root': {
      height: '20px',
    },

    '& .MuiSelect-select': {
      marginTop: '-3px',
    },
  },

  textInput: {
    '& .MuiOutlinedInput-root': {
      height: '40px !important',
      minHeight: '40px !important',
    },
  },

  searchButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(190, 190, 190, 0.8)',
  },
};

export default memo(Kanban);
