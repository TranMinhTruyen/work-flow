import { memo, useCallback, MouseEvent } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import IContent from '../../model/draganddrop/Content';
import IconButton from '../../components/button/IconButton';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Draggable } from '@hello-pangea/dnd';

type TaskProps = {
  data: IContent;
  index: number;
};

const Task = ({ index, data }: TaskProps) => {
  const onClickTitle = useCallback((event: MouseEvent) => {
    event.stopPropagation();
    console.log('Go to issue page');
  }, []);

  const onClickCard = useCallback(() => {
    console.log('Open detail dialog');
  }, []);

  return (
    <Draggable draggableId={`${data.id}`} index={index}>
      {(provided, snapshot) => (
        <Box onClick={onClickCard}>
          <Grid2 container>
            <Card
              sx={{
                width: 500,
                maxWidth: 500,
                height: 230,
                maxHeight: 230,
                borderRadius: 2,
                backgroundColor: snapshot.isDragging ? 'rgba(120, 255, 120)' : '#ffffff',
              }}
              style={{ ...provided.draggableProps.style }}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Stack direction={'row'} sx={{ padding: 1.4, height: 54 }}>
                <Stack direction={'row'} sx={{ flexGrow: 1 }} spacing={2}>
                  <Box>
                    <Tooltip title={data.title.length >= 20 ? data.title : undefined}>
                      <Typography
                        variant="h6"
                        component="span"
                        sx={{
                          color: 'rgba(5, 205, 160)',
                          cursor: 'pointer',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          textTransform: 'uppercase',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '&:hover': { textDecoration: 'underline' },
                        }}
                        onClick={onClickTitle}
                      >
                        {data.title}
                      </Typography>
                    </Tooltip>
                  </Box>

                  <Box
                    sx={{
                      width: 100,
                      maxWidth: 100,
                      backgroundColor: data.type?.typeColor ?? 'rgba(75, 235, 50)',
                      borderRadius: 5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h6" component="span">
                      {data.type?.typeName}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction={'row'} spacing={1}>
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      maxWidth: 30,
                      maxHeight: 30,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {data.priority === 'high' ? (
                      <KeyboardDoubleArrowUpIcon sx={{ color: 'rgba(235, 52, 52)' }} />
                    ) : undefined}
                    {data.priority === 'normal' ? (
                      <DragHandleIcon sx={{ color: 'rgba(250, 220, 5)' }} />
                    ) : undefined}
                    {data.priority === 'low' ? (
                      <KeyboardDoubleArrowDownIcon sx={{ color: 'rgba(30, 80, 250)' }} />
                    ) : undefined}
                  </Box>
                </Stack>
              </Stack>

              <Divider />

              <CardContent sx={{ padding: 1, height: 117 }}>
                <Stack direction={'row'}>
                  <Typography
                    variant="body1"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {data.content}
                  </Typography>
                </Stack>
              </CardContent>

              <Divider />

              <CardActions sx={{ padding: 1 }}>
                <Stack direction={'row'} spacing={2}>
                  <IconButton
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: 'rgba(120, 120, 120, 0.8)',
                    }}
                    icon={<Avatar />}
                  />
                  <Stack direction={'row'} alignItems={'center'}>
                    <Typography sx={{ fontWeight: 'bold' }}>{data.dueDate}</Typography>
                  </Stack>
                </Stack>
              </CardActions>
            </Card>
          </Grid2>
        </Box>
      )}
    </Draggable>
  );
};

export default memo(Task);
