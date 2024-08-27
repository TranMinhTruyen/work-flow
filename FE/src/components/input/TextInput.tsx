import { styled } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { ChangeEvent, useLayoutEffect, useState } from 'react';

export type TextInputProps = Omit<TextFieldProps, 'onChange'> & {
  label?: string;
  width?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

const TextInput = (props: TextInputProps) => {
  const { label, width, value: valueProps, defaultValue, onChange, ...restProps } = props;
  const [value, setValue] = useState<string>(defaultValue ?? '');

  useLayoutEffect(() => {
    if (value === valueProps) {
      return;
    }
    if (valueProps !== undefined) {
      setValue(valueProps);
    }
  }, [value, valueProps]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange?.(event.target.value);
  };

  return (
    <StyledTextInput
      value={value}
      sx={{ width: width }}
      onChange={handleOnChange}
      label={label}
      InputLabelProps={{
        shrink: true,
      }}
      {...restProps}
    />
  );
};

const StyledTextInput = styled(TextField)({
  '& .MuiInputLabel-root': {
    color: 'rgba(13, 13, 13) !important',
    marginLeft: '10px',
  },

  '& .MuiOutlinedInput-notchedOutline legend': {
    marginLeft: '10px',
  },

  '& .MuiOutlinedInput-root': {
    height: 50,
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

  input: {
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px rgba(255, 255, 255) inset',
      borderRadius: 50,
    },
  },
});

export default TextInput;
