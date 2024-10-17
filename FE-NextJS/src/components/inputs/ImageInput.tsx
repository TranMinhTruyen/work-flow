'use client';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { convertToDataURL, readFileAsByte, readFileAsDataURL } from '@/common/utils/convertUtil';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Avatar from '@mui/material/Avatar';
import ClearIcon from '@mui/icons-material/Clear';
import { FileInputData } from '@/common/constants/type';
import { IMAGE_FILE_TYPE } from '@/common/constants/commonConst';
import { capitalizeFirst, isNullOrEmpty } from '@/common/utils/stringUtil';

export type ImageInputProps = {
  id?: string;
  height?: number;
  value?: FileInputData;
  onChange?: (value: FileInputData) => void;
};

const ImageInput = (props: ImageInputProps) => {
  const { id, height = 150, value: valueProps, onChange } = props;

  const [imageFile, setImageFile] = useState<FileInputData | null>(valueProps ?? null);
  const imageRef = useRef<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const convertAndSetImage = async () => {
      imageRef.current = await convertToDataURL(imageFile?.fileData);
    };
    convertAndSetImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settingFileList = useCallback(
    async (fileInputList: FileList | any[] | null) => {
      if (fileInputList && fileInputList.length > 0) {
        const fileItem: FileInputData = {};
        fileItem.fileData = await readFileAsByte(fileInputList[0] as File);
        fileItem.file = fileInputList[0] as File;

        imageRef.current = await readFileAsDataURL(fileInputList[0] as File);

        setImageFile(prev => {
          prev = fileItem;
          return prev;
        });

        onChange?.(fileItem);

        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: IMAGE_FILE_TYPE,
    noClick: true,
    onDrop: async acceptedFiles => {
      await settingFileList(acceptedFiles);
    },
  });

  const handleImageUpload = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      await settingFileList(event.target.files);
    },
    [settingFileList]
  );

  const handleDeleteImage = useCallback(() => {
    imageRef.current = null;
    setImageFile(null);
    onChange?.({});
  }, [onChange]);

  return (
    <Box {...getRootProps()}>
      <input
        id={`imageUpload${capitalizeFirst(id)}`}
        type={'file'}
        hidden
        onChange={handleImageUpload}
        {...getInputProps()}
        ref={inputRef}
      />
      <label htmlFor={`imageUpload${capitalizeFirst(id)}`}>
        <IconButton
          component={'span'}
          sx={{
            width: height,
            height: height,
          }}
        >
          <Avatar
            src={imageRef.current ?? ''}
            sx={{
              width: height,
              height: height,
              maxWidth: height,
              maxHeight: height,
              bgcolor: 'rgba(0, 170, 255, 0.8)',
            }}
          />
        </IconButton>
      </label>
      {!isNullOrEmpty(imageRef.current) && (
        <IconButton
          id={`imageUpload${capitalizeFirst(id)}ClearButton`}
          onClick={handleDeleteImage}
          sx={{
            width: '30px',
            height: '30px',
            position: 'absolute',
            marginLeft: '-30px',
            color: 'white',
            backgroundColor: 'red',
            '&:hover': {
              backgroundColor: 'darkred',
            },
          }}
        >
          <ClearIcon id={`imageUpload${capitalizeFirst(id)}ClearIcon`} />
        </IconButton>
      )}
    </Box>
  );
};

export default ImageInput;
