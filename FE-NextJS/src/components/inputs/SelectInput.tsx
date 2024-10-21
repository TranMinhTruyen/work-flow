'use client';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import { styled, SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { SelectDataType } from '@/common/constants/type';
import { capitalizeFirst } from '@/common/utils/stringUtil';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { I18nEnum } from '@/common/enums/I18nEnum';

export type SelectInputProps = Omit<
  SelectProps,
  'multiple' | 'defaultValue' | 'displayEmpty' | 'value' | 'onChange' | 'onBlur'
> & {
  i18n?: I18nEnum;
  label?: string;
  width?: number;
  sx?: SxProps<Theme>;
  value?: string;
  data: SelectDataType[];
  defaultValue?: string;
  displayNone?: boolean;
  helperText?: string | null;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
};

const SelectInput = (props: SelectInputProps) => {
  const {
    id,
    label,
    width = 200,
    sx,
    data,
    value: valueProps,
    onChange: onChangeProps,
    onBlur: onBlurProps,
    defaultValue,
    placeholder,
    displayNone,
    error = false,
    helperText,
    ...restProps
  } = props;

  const [selectValue, setSelectValue] = useState<string>(defaultValue ?? '');

  useEffect(() => {
    if (valueProps !== undefined && selectValue.includes(valueProps)) {
      return;
    }
    if (valueProps !== undefined) {
      setSelectValue(valueProps);
    }
  }, [selectValue, valueProps]);

  const handleOnChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: SelectChangeEvent<any>) => {
      setSelectValue(event.target.value);
      onChangeProps?.(event.target.value as string);
    },
    [onChangeProps]
  );

  const handleOnBlur = useCallback(() => {
    onBlurProps?.(selectValue);
  }, [onBlurProps, selectValue]);

  const noneValue = useMemo(() => {
    return (
      displayNone && (
        <MenuItem value={''} sx={{ padding: '5px' }}>
          <Checkbox checked={selectValue === ''} />
          <Typography>None</Typography>
        </MenuItem>
      )
    );
  }, [displayNone, selectValue]);

  return (
    <FormControlStyled id={`form${capitalizeFirst(id)}`} sx={{ width: width, ...sx }} error={error}>
      <InputLabel id={`label${capitalizeFirst(id)}`} sx={sx} shrink={true}>
        {label}
      </InputLabel>
      <Select
        id={`select${capitalizeFirst(id)}`}
        labelId={id}
        displayEmpty
        label={label}
        notched={true}
        error={error}
        value={selectValue}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        sx={sx}
        renderValue={selected => {
          const renderValue = data.find(x => x.key === (selected as string));
          if (renderValue === undefined) {
            return <Typography sx={{ color: '#A9A9A9', marginLeft: 1 }}>{placeholder}</Typography>;
          }
          return (
            <Chip
              color={'error'}
              label={renderValue.value}
              sx={{
                height: '30px',
                ...sx,
              }}
            />
          );
        }}
        {...restProps}
      >
        {noneValue}
        {data.map((item, index) => (
          <MenuItem key={index} value={item.key} sx={{ padding: '5px' }}>
            <Checkbox checked={selectValue === item.key} />
            <Typography>{item.value}</Typography>
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </FormControlStyled>
  );
};

const FormControlStyled = styled(FormControl)(({ error }) => ({
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

  '& .MuiInputBase-formControl': {
    height: '50px',
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

export default SelectInput;
