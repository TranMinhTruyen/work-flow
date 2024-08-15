import Button from '@mui/material/Button';
import { ChangeEvent, useCallback, useState, MouseEvent } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Typography from '@mui/material/Typography';
import { readFileAsByte } from 'common/utils/convertUtil';
import TextInput from './TextInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import styled from '@emotion/styled';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ButtonGroup from '@mui/material/ButtonGroup';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export type FileInputProps = {
  label?: string;
  height?: number;
  width?: number;
  multipleFile?: boolean;
  onChange?: (value: FileData[] | null) => void;
};

export interface FileData {
  file?: File;
  fileData?: Uint8Array;
}

const FileInput = (props: FileInputProps) => {
  const { label, width = 500, height = 40, multipleFile = true, onChange } = props;

  const [file, setFile] = useState<FileData[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleFileUpload = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        let fileList: FileData[] = [];

        for (var i = 0; i < event.target.files.length; i++) {
          let fileItem: FileData = {};
          fileItem.fileData = await readFileAsByte(event.target.files[i]);
          fileItem.file = event.target.files[i];
          fileList.push(fileItem);
        }

        setFile(prev => {
          fileList.forEach(item => {
            prev.push(item);
          });
          return prev;
        });

        if (onChange) {
          onChange(fileList);
        }
      }
    },
    [onChange]
  );

  const handleDeleteFile = useCallback(
    (index: number) => () => {
      if (index > -1 && index < file.length) {
        const newFileList = [...file];
        newFileList.splice(index, 1);
        setFile(newFileList);

        if (onChange) {
          onChange(newFileList);
        }
      }
    },
    [file, onChange]
  );

  return (
    <TextInput
      size={'medium'}
      value={file.length === 0 ? label : `Total file: ${file.length}`}
      sx={{ width: width, height: height }}
      disabled
      InputProps={{
        startAdornment: (
          <InputAdornment position={'start'}>
            <FolderIcon
              sx={{ marginLeft: 0.5, fontSize: 25 }}
              color={file.length === 0 ? 'inherit' : 'primary'}
            />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position={'end'}>
            <ButtonGroup variant={'contained'} sx={{ borderRadius: 25 }}>
              <Button
                component={'label'}
                tabIndex={-1}
                sx={{
                  width: 100,
                  borderRadius: 25,
                  '&:hover': {
                    backgroundColor: 'rgba(210, 210, 210, 0.8)',
                    color: '#000000',
                  },
                }}
              >
                <FileUploadIcon />
                <input type="file" multiple={multipleFile} hidden onChange={handleFileUpload} />
              </Button>
              <Button
                sx={{
                  width: 40,
                  borderRadius: 25,
                  '&:hover': {
                    backgroundColor: 'rgba(210, 210, 210, 0.8)',
                    color: '#000000',
                  },
                }}
                onClick={handleClick}
              >
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Button>
            </ButtonGroup>
            <StyledMenu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              slotProps={{
                paper: {
                  sx: {
                    width: 400,
                    overflow: 'auto',
                    maxHeight: 300,
                    backgroundColor: 'rgba(255, 255, 255)',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.8)',
                  },
                },
              }}
            >
              {file.length === 0 ? (
                <MenuItem onClick={handleClose}>
                  <Typography>Empty</Typography>
                </MenuItem>
              ) : (
                file.map((item, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton
                        size={'large'}
                        edge={'end'}
                        color={'error'}
                        onClick={handleDeleteFile(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <InsertDriveFileIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <Typography
                      key={index}
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.file?.name}
                    </Typography>
                  </ListItem>
                ))
              )}
            </StyledMenu>
          </InputAdornment>
        ),
      }}
    />
  );
};

const StyledMenu = styled(Menu)({
  elevation: 0,
  overflow: 'visible',
  marginTop: 5,
  '& .MuiAvatar-root': {
    width: 35,
    height: 35,
    marginRight: 10,
  },
});

export default FileInput;
