import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Category from './Category';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import SearchIcon from '@mui/icons-material/Search';
import { assigneeSelect, issueTypeSelect, sampleData, statusTypeSelect } from './data/boardData';
import SelectInput from 'components/input/SelectInput';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ICategory from 'model/draganddrop/category';
import TextInput from 'components/input/TextInput';
import IconButton from 'components/button/IconButton';
import FloatButton from 'components/button/FloatButton';
import Grid2 from '@mui/material/Grid2';

const Kanban = () => {
  const [state, setState] = useState<ICategory[]>([]);
  const [isShowFilter, setIsShowFilter] = useState<boolean>(true);

  useEffect(() => {
    setState(sampleData);
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
        const copiesTasks = prevState[sInd].content.slice();

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
    setIsShowFilter(prevState => {
      return !prevState;
    });
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
            defaultValue={''}
            label={'Issue Type'}
            disabled={!isShowFilter}
          />

          <SelectInput
            displayNone
            data={statusTypeSelect}
            defaultValue={''}
            label={'Status'}
            disabled={!isShowFilter}
          />

          <SelectInput
            displayNone
            data={assigneeSelect}
            defaultValue={''}
            label={'Assignee'}
            disabled={!isShowFilter}
          />

          <TextInput label={'Title'} disabled={!isShowFilter} />

          <IconButton
            icon={<SearchIcon />}
            disabled={!isShowFilter}
            sx={{
              width: 40,
              height: 40,
              backgroundColor: 'rgba(190, 190, 190, 0.8)',
            }}
          />
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

        <FloatButton
          onClick={onClickFilter}
          startIcon={isShowFilter ? <FilterAltOffIcon /> : <FilterAltIcon />}
          label={isShowFilter ? 'Hide filter' : 'Show filter'}
          sx={{
            width: 130,
            height: 40,
            backgroundColor: 'rgba(190, 190, 190, 0.8)',
          }}
        />
      </Stack>

      {filter}

      <Grid2 spacing={2} container size={{ xs: 12 }}>
        <Grid2 size={{ xs: 12 }}>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Stack
              spacing={2}
              direction={'row'}
              divider={<Divider orientation="vertical" flexItem />}
            >
              {category}
            </Stack>
          </DragDropContext>
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default memo(Kanban);
