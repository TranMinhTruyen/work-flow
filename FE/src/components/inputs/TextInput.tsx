import { capitalizeFirst } from '@/common/utils/stringUtil';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { InputAdornment, styled } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';

export type TextInputProps = Omit<TextFieldProps, 'onChange' | 'onBlur' | 'defaultValue'> & {
  label?: string;
  width?: number;
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

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChangeProps?.(event.target.value);
  };

  const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onBlurProps?.(event.target.value);
  };

  return (
    <StyledTextInput
      id={`textInput${capitalizeFirst(id)}`}
      value={value}
      sx={{ width: width }}
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

const StyledTextInput = styled(TextField)({
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
    height: '40px !important',
    minHeight: '40px !important',
    '& fieldset': {
      borderColor: 'rgba(13, 13, 13, 0.8)',
      borderRadius: 50,
    },
    '&:hover fieldset': {
      borderColor: '#00b2ff',
    },
    '& .Mui-focused fieldset': {
      borderColor: '#007fb6',
    },
  },
});

export default TextInput;
