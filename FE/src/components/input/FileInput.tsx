import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { ChangeEvent, useCallback, useState } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Typography from '@mui/material/Typography';
import { readFileAsByte } from 'common/utils/convertUtil';

export type FileInputProps = {
  label?: string;
  height?: number;
  width?: number;
  onChange?: (value: Uint8Array | null) => void;
};

const FileInput = (props: FileInputProps) => {
  const { label, width = 200, height = 40, onChange } = props;

  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const fileData = event.target.files[0];
        setFile(fileData);
        const filesDataString = await readFileAsByte(fileData);
        if (onChange) {
          onChange(filesDataString);
        }
      }
    },
    [onChange]
  );

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
      startIcon={!file && <FileUploadIcon />}
    >
      {file === null ? (
        <Typography>{label}</Typography>
      ) : (
        <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {file.name}
        </Typography>
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
