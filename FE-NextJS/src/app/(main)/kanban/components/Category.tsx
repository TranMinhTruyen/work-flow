import { ICategory } from '@/app/(main)/kanban/model/Category';
import Button from '@/components/button/Button';
import { Droppable } from '@hello-pangea/dnd';
import AddIcon from '@mui/icons-material/Add';
import Grid2 from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import Task from './Task';

type CategoryProps = {
  categoryItem: ICategory;
  index: number;
};

const Category = ({ categoryItem, index }: CategoryProps) => {
  return (
    <Droppable key={`${index}`} droppableId={`${categoryItem.id}`}>
      {(provided, snapshot) => (
        <Stack spacing={0.5}>
          <Grid2
            container
            direction={'row'}
            spacing={2.5}
            alignItems={'center'}
            sx={{ width: 400, maxWidth: 400, height: 50, maxHeight: 50 }}
          >
            <Grid2 size={{ xs: 6 }} sx={{ paddingLeft: 0 }}>
              <Stack direction={'row'} spacing={1}>
                <Typography variant={'h5'}>{categoryItem.name}</Typography>

                <Typography
                  variant={'h6'}
                  align={'center'}
                  sx={{
                    backgroundColor: categoryItem.color ?? 'rgba(100, 255, 255)',
                    borderRadius: 25,
                    width: 30,
                  }}
                >
                  {categoryItem.content.length}
                </Typography>
              </Stack>
            </Grid2>

            {index === 0 && (
              <Grid2 size={{ xs: 6 }} sx={{ paddingRight: 0 }}>
                <Stack
                  direction={'row'}
                  sx={{ justifyContent: ' flex-end', alignItems: 'center' }}
                  spacing={2}
                >
                  <Button
                    startIcon={<AddIcon />}
                    label={<Typography sx={{ fontWeight: 'bold' }}>Add issue</Typography>}
                    sx={{
                      width: 120,
                      height: 30,
                      backgroundColor: 'rgba(190, 190, 190, 0.8)',
                    }}
                  />
                </Stack>
              </Grid2>
            )}
          </Grid2>

          <Grid2
            size={{ xs: 6 }}
            sx={{
              width: 400,
              maxWidth: 400,
              height: '78vh',
              maxHeight: '78vh',
              backgroundColor: snapshot.isDraggingOver
                ? 'rgba(150, 255, 255, 0.8)'
                : 'rgba(210, 210, 210, 1)',
              borderRadius: 2,
            }}
          >
            <Grid2
              sx={{
                padding: 2,
                height: '78vh',
                maxHeight: '78vh',
                overflow: 'auto',
                '& > *:not(:last-child)': {
                  marginBottom: '15px',
                },
              }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {categoryItem.content.map((data, index) => {
                return <Task key={`task-${data.id}`} index={index} data={data} />;
              })}
            </Grid2>
            {provided.placeholder}
          </Grid2>
        </Stack>
      )}
    </Droppable>
  );
};

export default memo(Category);
