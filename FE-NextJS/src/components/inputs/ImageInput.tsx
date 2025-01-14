'use client';
import { IMAGE_FILE_TYPE } from '@/common/constants/commonConst';
import { FileInputData } from '@/common/constants/typeConst';
import { convertToDataURL, readFileAsByte, readFileAsDataURL } from '@/common/utils/convertUtil';
import { capitalizeFirst, isNullOrEmpty } from '@/common/utils/stringUtil';
import ClearIcon from '@mui/icons-material/Clear';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export type ImageInputProps = {
  id?: string;
  height?: number;
  value?: FileInputData;
  onChange?: (value: FileInputData | null) => void;
};

const ImageInput = (props: ImageInputProps) => {
  const { id, height = 150, value: valueProps, onChange } = props;

  const [imageFile, setImageFile] = useState<FileInputData | null>(valueProps ?? null);
  const imageRef = useRef<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    convertAndSetImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const convertAndSetImage = useCallback(async () => {
    imageRef.current = await convertToDataURL(imageFile?.fileData);
  }, [imageFile?.fileData]);

  const settingImageFile = useCallback(
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
      await settingImageFile(acceptedFiles);
    },
  });

  const handleImageUpload = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      await settingImageFile(event.target.files);
    },
    [settingImageFile]
  );

  const handleDeleteImage = useCallback(() => {
    imageRef.current = null;
    setImageFile(null);
    onChange?.(null);
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
