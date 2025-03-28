'use client';

import { SelectDataType } from '@/common/constants/typeConst';
import { I18nEnum } from '@/common/enums/I18nEnum';
import { capitalizeFirst } from '@/common/utils/stringUtil';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControl, { FormControlProps as MuiFormControlProps } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import { styled, SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';

export type MultiSelectInputProps = Omit<
  SelectProps,
  'multiple' | 'value' | 'onChange' | 'onBlur'
> & {
  i18n: I18nEnum;
  width?: number;
  sx?: SxProps<Theme>;
  value?: string[];
  data: SelectDataType[];
  helperText?: string | null;
  onChange?: (value: string[]) => void;
  onBlur?: (value: string[]) => void;
};

type FormControlProps = MuiFormControlProps & {
  error: boolean;
  valuelength: number;
};

const MultiSelectInput = (props: MultiSelectInputProps) => {
  const {
    id,
    width = 200,
    sx,
    data,
    value: valueProps,
    onChange: onChangeProps,
    onBlur: onBlurProps,
    label,
    error = false,
    helperText,
    className,
    ...restProps
  } = props;

  const [selectValues, setSelectValues] = useState<string[]>([]);

  useEffect(() => {
    setSelectValues(valueProps ?? []);
  }, [valueProps]);

  const handleOnChange = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      const currentValue = event.target.value;

      let newValues: string[];
      if (typeof currentValue === 'string') {
        newValues = currentValue.split(',');
      } else {
        newValues = currentValue;
      }

      setSelectValues(newValues);
      onChangeProps?.(newValues);
    },
    [onChangeProps]
  );

  const handleOnBlur = useCallback(() => {
    onBlurProps?.(selectValues);
  }, [onBlurProps, selectValues]);

  const handleDelete = useCallback(
    (key: string) => () => {
      const newSelectValues = selectValues.filter(item => item !== key);
      setSelectValues(newSelectValues);
      onChangeProps?.(newSelectValues);
    },
    [onChangeProps, selectValues]
  );

  return (
    <FormControlStyled
      id={`form${capitalizeFirst(id)}`}
      sx={{ width: width, ...sx }}
      error={error}
      valuelength={selectValues.length}
      className={className}
    >
      <InputLabel id={`label${capitalizeFirst(id)}`} sx={sx} shrink={true}>
        {label}
      </InputLabel>
      <Select
        id={`multiSelect${capitalizeFirst(id)}`}
        labelId={id}
        displayEmpty
        label={label}
        notched={true}
        error={error}
        value={selectValues}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        sx={sx}
        multiple
        renderValue={selected => {
          const renderValue = data.filter(item => (selected as string[]).includes(item.key));
          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {renderValue.map((item, index) => (
                <Chip
                  key={index}
                  label={item.value}
                  color={'error'}
                  onDelete={handleDelete(item.key)}
                  onMouseDown={event => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                />
              ))}
            </Box>
          );
        }}
        {...restProps}
      >
        {data.map((item, index) => (
          <MenuItem key={index} value={item.key} sx={{ padding: '5px' }}>
            <Checkbox checked={selectValues.some(selectValue => selectValue === item.key)} />
            <Typography>{item.value}</Typography>
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </FormControlStyled>
  );
};
export default MultiSelectInput;

const FormControlStyled = styled(FormControl)<FormControlProps>(({ error, valuelength }) => ({
  '& .MuiInputLabel-root': {
    color: 'rgba(13, 13, 13)',
    marginLeft: '10px',
    '&.Mui-focused': {
      color: 'rgba(0, 0, 0)',
    },
  },

  '& .MuiOutlinedInput-notchedOutline legend': {
    marginLeft: '10px',
  },

  '& .MuiChip-root': {
    height: '25px',
    '& .MuiSvgIcon-root': {
      width: '25px !important',
      height: '25px !important',
      marginRight: '0px',
    },
  },

  '& .MuiInputBase-formControl': {
    height: `${valuelength > 2 ? 'auto' : 40}px`,
    minHeight: '40px',
  },

  '& .MuiOutlinedInput-input': {
    minWidth: '94%',
    padding: '12px',
    color: 'rgba(13, 13, 13, 0.8)',
  },

  '& .MuiOutlinedInput-root': {
    borderRadius: '50px',
    '& fieldset': {
      borderWidth: '1px',
      borderColor: error === false ? 'rgba(13, 13, 13, 0.8)' : 'rgba(0, 0, 0)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0, 178, 255, 1)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(0, 178, 255, 1)',
    },
  },
}));
