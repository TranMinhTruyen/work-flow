import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import ICategory from '../../model/draganddrop/Category';
import Category from './Category';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '../../components/button/IconButton';
import TextInput from '../../components/input/TextInput';
import FloatButton from '../../components/button/FloatButton';
import { assigneeSelect, issueTypeSelect, sampleData, statusTypeSelect } from './data/boardData';
import SelectInput from 'components/input/SelectInput';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const Board = () => {
  const [state, setState] = useState<ICategory[]>([]);
  const [isFilter, setIsFilter] = useState<boolean>(true);

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
    setIsFilter(prevState => {
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

  return (
    <Stack spacing={2} sx={{ paddingLeft: 2, height: '80vh' }}>
      <Stack direction={'row'} spacing={4} alignItems={'center'}>
        <Typography variant="h5" component="span">
          Board
        </Typography>

        <FloatButton
          onClick={onClickFilter}
          startIcon={isFilter ? <FilterAltOffIcon /> : <FilterAltIcon />}
          label={isFilter ? 'Hide filter' : 'Show filter'}
          sx={{
            width: 130,
            height: 40,
            backgroundColor: 'rgba(190, 190, 190, 0.8)',
          }}
        />
      </Stack>

      {isFilter ? (
        <Stack direction={'row'} spacing={2} alignItems={'center'}>
          <SelectInput
            data={issueTypeSelect}
            defaultValue={''}
            label={'Issue Type'}
            disabled={!isFilter}
          />

          <SelectInput
            data={statusTypeSelect}
            defaultValue={''}
            label={'Status'}
            disabled={!isFilter}
          />

          <SelectInput
            data={assigneeSelect}
            defaultValue={''}
            label={'Assignee'}
            disabled={!isFilter}
          />

          <TextInput label={'Title'} disabled={!isFilter} />

          <IconButton
            icon={<SearchIcon />}
            disabled={!isFilter}
            sx={{
              width: 40,
              height: 40,
              backgroundColor: 'rgba(190, 190, 190, 0.8)',
            }}
          />
        </Stack>
      ) : undefined}

      <Grid2 spacing={2} container xs={12}>
        <Grid2 xs={12}>
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

export default memo(Board);