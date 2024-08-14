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

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          onChange(file);
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
          <InputAdornment position={'end'}>
            <IconButton onClick={handleClick} edge={'start'} size={'medium'} color={'primary'}>
              <FolderIcon />
            </IconButton>
            <StyledMenu
              anchorEl={anchorEl}
              open={open}
              transformOrigin={{ horizontal: 'left', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              slotProps={{
                paper: {
                  sx: {
                    width: 400,
                    overflow: 'visible',
                    backgroundColor: 'rgba(210, 210, 210, 0.8)',
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      left: 15,
                      width: 10,
                      height: 10,
                      backgroundColor: 'inherit',
                      transform: 'translateY(-50%) rotate(45deg)',
                    },
                  },
                },
              }}
            >
              {file.length === 0 ? (
                <MenuItem onClick={handleClose}>
                  <Typography>Empty</Typography>
                </MenuItem>
              ) : (
                <>
                  <MenuItem onClick={handleClose}>
                    <Typography>Close</Typography>
                  </MenuItem>
                  {file.map((item, index) => (
                    <MenuItem>
                      <Typography
                        key={index}
                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                      >
                        {item.file?.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </>
              )}
            </StyledMenu>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position={'end'}>
            <Button
              component="label"
              variant="contained"
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
          </InputAdornment>
        ),
      }}
    />
  );
};

const StyledMenu = styled(Menu)({
  elevation: 0,
  overflow: 'visible',
  marginTop: 15,
  '& .MuiAvatar-root': {
    width: 35,
    height: 35,
    marginRight: 10,
  },
});

export default FileInput;
