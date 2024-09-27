import Button from '@mui/material/Button';
import { ChangeEvent, useCallback, useState, MouseEvent, useRef } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Typography from '@mui/material/Typography';
import { readFileAsByte } from 'common/utils/convertUtil';
import TextInput from './TextInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
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
import { Accept, useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { FileInputData } from 'common/constants/type';
import { styled } from '@mui/material/styles';
import { translate } from 'common/utils/i18nUtil';
import { I18nEnum } from 'common/enums/i18nEnum';

export type FileInputProps = {
  i18n: I18nEnum;
  label?: string;
  height?: number;
  width?: number;
  value?: FileInputData[];
  acceptFile?: Accept;
  multipleFile?: boolean;
  error?: boolean;
  helperText?: string | null;
  onChange?: (value: FileInputData[]) => void;
  onBlur?: (value: FileInputData[]) => void;
};

const FileInput = (props: FileInputProps) => {
  const {
    i18n,
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
  const { t } = useTranslation();

  const [fileList, setFileList] = useState<FileInputData[]>(valueProps ?? []);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const open = Boolean(anchorEl);

  const settingFileList = useCallback(
    async (fileInputList: FileList | any[] | null) => {
      if (fileInputList) {
        let fileDataList: FileInputData[] = [];

        for (var i = 0; i < fileInputList.length; i++) {
          let fileItem: FileInputData = {};
          fileItem.fileData = await readFileAsByte(fileInputList[i] as File);
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

  const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
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
        size={'small'}
        label={label}
        error={error}
        i18n={i18n}
        placeholder={t(translate('label.totalFile', I18nEnum.COMMON_I18N)) + `${fileList.length}`}
        sx={{ width: width, height: height }}
        onBlur={handleOnBlur}
        slotProps={{
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
                      type={'file'}
                      multiple={multipleFile}
                      hidden
                      onChange={handleFileUpload}
                      {...getInputProps()}
                      ref={inputRef}
                    />
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
                  {fileList.length === 0 ? (
                    <MenuItem onClick={handleClose}>
                      <Typography>Empty</Typography>
                    </MenuItem>
                  ) : (
                    fileList.map((item, index) => (
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
