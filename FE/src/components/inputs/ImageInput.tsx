import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { IMAGE_FILE_TYPE } from 'common/constants/commonConst';
import { FileInputData } from 'common/constants/type';
import { readFileAsByte } from 'common/utils/convertUtil';
import { ChangeEvent, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export type ImageInputProps = {
  label?: string;
  height?: number;
  width?: number;
  value?: FileInputData;
  error?: boolean;
  helperText?: string | null;
  onChange?: (value: FileInputData) => void;
  onBlur?: (value: FileInputData) => void;
};

const ImageInput = (props: ImageInputProps) => {
  const {
    label,
    height,
    width = 200,
    value: valueProps,
    error = false,
    helperText,
    onChange,
    onBlur,
  } = props;

  const [imageFile, setImageFile] = useState<FileInputData>(valueProps ?? {});

  const { getRootProps, getInputProps } = useDropzone({
    accept: IMAGE_FILE_TYPE,
    noClick: true,
    onDrop: async acceptedFiles => {
      await settingFileList(acceptedFiles);
    },
  });

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

        setImageFile(prev => {
          fileDataList.forEach(item => {
            prev = item;
          });
          return prev;
        });

        onChange?.(imageFile);
      }
    },
    [imageFile, onChange]
  );

  const handleFileUpload = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      await settingFileList(event.target.files);
    },
    [settingFileList]
  );

  return (
    <Box {...getRootProps()}>
      <IconButton
        sx={{
          backgroundImage: imageFile.fileData
            ? `url(data:image/png;base64,${imageFile.fileData})`
            : '',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: 40,
          height: 40,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <input type={'file'} hidden onChange={handleFileUpload} {...getInputProps()} />
      </IconButton>
    </Box>
  );
};

export default ImageInput;
