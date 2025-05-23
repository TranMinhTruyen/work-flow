import TextFieldsIcon from '@mui/icons-material/TextFields';
import { InputAdornment, styled } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { ChangeEvent, FocusEvent, useCallback, useEffect, useState } from 'react';

import { capitalizeFirst } from '@/common/utils/stringUtil';

export type TextInputProps = Omit<TextFieldProps, 'onChange' | 'onBlur' | 'defaultValue'> & {
  label?: string;
  width?: number;
  height?: number;
  value?: string;
  maxLength?: number;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
};

const TextInput = (props: TextInputProps) => {
  const {
    id,
    label,
    width,
    height = 40,
    value: valueProps,
    maxLength,
    onChange: onChangeProps,
    onBlur: onBlurProps,
    className,
    slotProps,
    ...restProps
  } = props;
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue(valueProps ?? '');
  }, [valueProps]);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      onChangeProps?.(event.target.value);
    },
    [onChangeProps]
  );

  const handleOnBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      onBlurProps?.(event.target.value);
    },
    [onBlurProps]
  );

  return (
    <StyledTextInput
      id={`textInput${capitalizeFirst(id)}`}
      value={value}
      sx={{ width: `${width}px` }}
      height={height}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      label={label}
      className={className}
      slotProps={{
        inputLabel: {
          shrink: true,
        },
        htmlInput: {
          maxLength: maxLength,
        },
        input: {
          startAdornment: (
            <InputAdornment position={'start'}>
              <TextFieldsIcon />
            </InputAdornment>
          ),
        },
        ...slotProps,
      }}
      {...restProps}
    />
  );
};

const StyledTextInput = styled(TextField)<any>(({ height }) => ({
  '& .MuiInputLabel-root': {
    color: 'rgba(0, 0, 0, 1) !important',
    marginLeft: '10px',
  },

  '& .MuiOutlinedInput-notchedOutline legend': {
    marginLeft: '10px',
  },

  '& .MuiInputAdornment-root': {
    '& .MuiSvgIcon-root': {
      width: '20px',
      height: '20px',
    },
  },

  '& .MuiOutlinedInput-root': {
    height: `${height}px !important`,
    minHeight: `${height}px !important`,
    '& fieldset': {
      borderColor: 'rgba(13, 13, 13, 0.8)',
      borderRadius: '50px',
    },
    '&:hover fieldset': {
      borderColor: '#00b2ff',
    },
    '& .Mui-focused fieldset': {
      borderColor: '#007fb6',
    },
  },
}));

export default TextInput;
