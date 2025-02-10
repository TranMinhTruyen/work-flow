'use client';

import { I18nEnum } from '@/common/enums/I18nEnum';
import { FileData } from '@/common/model/FileData';
import { readFileAsByte } from '@/common/utils/convertUtil';
import { capitalizeFirst } from '@/common/utils/stringUtil';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ChangeEvent, MouseEvent, useCallback, useRef, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import TextInput from './TextInput';

export type FileInputProps = {
  id?: string;
  label?: string;
  height?: number;
  width?: number;
  value?: FileData[];
  acceptFile?: Accept;
  multipleFile?: boolean;
  error?: boolean;
  helperText?: string | null;
  onChange?: (value: FileData[]) => void;
  onBlur?: (value: FileData[]) => void;
};

const FileInput = (props: FileInputProps) => {
  const {
    id,
    label,
    height,
    width = 200,
    value: valueProps,
    acceptFile,
    multipleFile = true,
    error = false,
    helperText,
    onChange,
    onBlur,
  } = props;

  const [fileList, setFileList] = useState<FileData[]>(valueProps ?? []);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation(I18nEnum.COMMON_I18N);

  const settingFileList = useCallback(
    async (fileInputList: FileList | any[] | null) => {
      if (fileInputList) {
        const fileDataList: FileData[] = [];

        for (let i = 0; i < fileInputList.length; i++) {
          const fileItem: FileData = {};
          fileItem.data = Array.from(await readFileAsByte(fileInputList[i] as File));
          fileItem.file = fileInputList[i] as File;
          fileDataList.push(fileItem);
        }

        setFileList(prev => {
          fileDataList.forEach(item => {
            prev.push(item);
          });
          return prev;
        });

        onChange?.(fileDataList);

        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptFile,
    noClick: true,
    onDrop: async acceptedFiles => {
      await settingFileList(acceptedFiles);
    },
  });

  const handleClickShowFile = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleCloseShowFile = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleFileUpload = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      await settingFileList(event.target.files);
    },
    [settingFileList]
  );

  const handleDeleteFile = useCallback(
    (index: number) => () => {
      if (index > -1 && index < fileList.length) {
        const newFileList = [...fileList];
        newFileList.splice(index, 1);
        setFileList(newFileList);
        onChange?.(newFileList);
      }
    },
    [fileList, onChange]
  );

  const handleOnBlur = useCallback(() => {
    onBlur?.(fileList);
  }, [fileList, onBlur]);

  return (
    <Box {...getRootProps()}>
      <TextInput
        id={`fileUpload${capitalizeFirst(id)}`}
        size={'small'}
        label={label}
        error={error}
        placeholder={t('label.totalFile') + `${fileList.length}`}
        sx={{ width: width, height: height }}
        onBlur={handleOnBlur}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
          input: {
            readOnly: true,
            startAdornment: (
              <InputAdornment position={'start'}>
                <FolderIcon color={fileList.length === 0 ? 'inherit' : 'primary'} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position={'end'} sx={{ marginRight: '-7px' }}>
                <ButtonGroup variant={'contained'} sx={{ borderRadius: 25 }}>
                  <Button
                    id={`fileUpload${capitalizeFirst(id)}Button`}
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
                    <input
                      id={`fileUpload${capitalizeFirst(id)}`}
                      type={'file'}
                      multiple={multipleFile}
                      hidden
                      onChange={handleFileUpload}
                      {...getInputProps()}
                      ref={inputRef}
                    />
                  </Button>
                  <Button
                    id={`fileUpload${capitalizeFirst(id)}ShowFile`}
                    sx={{
                      width: 40,
                      borderRadius: 25,
                      '&:hover': {
                        backgroundColor: 'rgba(210, 210, 210, 0.8)',
                        color: '#000000',
                      },
                    }}
                    onClick={handleClickShowFile}
                  >
                    {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </Button>
                </ButtonGroup>
                <StyledMenu
                  id={`fileUpload${capitalizeFirst(id)}FileMenu`}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseShowFile}
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
                  {fileList.length === 0 ? (
                    <MenuItem onClick={handleCloseShowFile}>
                      <Typography>Empty</Typography>
                    </MenuItem>
                  ) : (
                    fileList.map((item, index) => (
                      <ListItem
                        id={`fileUpload${capitalizeFirst(id)}FileItem${index}`}
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
          },
        }}
        helperText={helperText}
      />
    </Box>
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
