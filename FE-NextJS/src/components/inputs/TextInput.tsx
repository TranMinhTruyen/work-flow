'use client';
import { InputAdornment, styled } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { I18nEnum } from '@/common/enums/I18nEnum';
import { capitalizeFirst } from '@/common/utils/stringUtil';

export type TextInputProps = Omit<TextFieldProps, 'onChange' | 'onBlur'> & {
  i18n?: I18nEnum;
  label?: string;
  width?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
};

const TextInput = (props: TextInputProps) => {
  const {
    id,
    label,
    width,
    value: valueProps,
    defaultValue,
    onChange: onChangeProps,
    onBlur: onBlurProps,
    ...restProps
  } = props;
  const [value, setValue] = useState<string>(defaultValue ?? '');

  useEffect(() => {
    if (value === valueProps) {
      return;
    }
    if (valueProps !== undefined) {
      setValue(valueProps);
    }
  }, [value, valueProps]);

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
      slotProps={{
        inputLabel: {
          shrink: true,
        },
        input: {
          startAdornment: (
            <InputAdornment position={'start'}>
              <TextFieldsIcon />
            </InputAdornment>
          ),
        },
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
    height: '50px !important',
    minHeight: '50px !important',
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
