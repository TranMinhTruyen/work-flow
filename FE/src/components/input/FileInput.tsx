import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { ChangeEvent, useState } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

export type FileInputProps = {
  label?: string;
  height?: number;
  width?: number;
  onChange?: (value: FileList | null) => void;
};

const FileInput = (props: FileInputProps) => {
  const { label, width = 200, height = 40, onChange } = props;

  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
      if (onChange) {
        onChange(files);
      }
    }
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      sx={{
        width: width,
        height: height,
        boxShadow: '#a8a8a8',
        fontSize: 16,
        borderRadius: 25,
        lineHeight: 1.5,
        '&:hover': {
          boxShadow: '#a8a8a8',
          backgroundColor: 'rgba(210, 210, 210, 0.8)',
          color: '#000000',
        },
      }}
      startIcon={!files && <FileUploadIcon />}
    >
      {files === null ? (
        <Box>{label}</Box>
      ) : (
        <Box>
          {Array.from(files).map((file, index) => (
            <Box key={index}>{file.name}</Box>
          ))}
        </Box>
      )}
      <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
    </Button>
  );
};

export default FileInput;

const VisuallyHiddenInput = styled(Input)({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
