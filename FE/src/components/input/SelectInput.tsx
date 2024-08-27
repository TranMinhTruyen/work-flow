import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { SelectDataType } from 'common/constants/type';
import { ReactNode, useCallback, useLayoutEffect, useMemo, useState } from 'react';

export type SelectInputProps = Omit<
  SelectProps,
  'multiple' | 'defaultValue' | 'displayEmpty' | 'value'
> & {
  label?: string;
  width?: number;
  value?: string;
  data: SelectDataType[];
  defaultValue?: string;
  displayNone?: boolean;
  helperText?: string | null;
};

const SelectInput = (props: SelectInputProps) => {
  const {
    label,
    width = 200,
    value: valueProps,
    data,
    onChange,
    defaultValue,
    placeholder,
    displayNone,
    error,
    helperText,
    ...restProps
  } = props;

  const [selectValues, setSelectValues] = useState<string>(defaultValue ?? '');

  useLayoutEffect(() => {
    if (valueProps !== undefined && selectValues.includes(valueProps)) {
      return;
    }
    if (valueProps !== undefined) {
      setSelectValues(valueProps);
    }
  }, [selectValues, valueProps]);

  const handleChange = useCallback(
    (event: SelectChangeEvent<any>, child: ReactNode) => {
      setSelectValues(event.target.value);
      onChange?.(event, child);
    },
    [onChange]
  );

  const noneValue = useMemo(() => {
    return (
      displayNone && (
        <MenuItem value={''} sx={{ padding: '5px' }}>
          <Checkbox checked={selectValues === ''} />
          <Typography>None</Typography>
        </MenuItem>
      )
    );
  }, [displayNone, selectValues]);

  return (
    <FormControlStyled sx={{ width: width }} error={error}>
      <InputLabel shrink={true}>
        <Typography sx={{ color: 'rgba(13, 13, 13)' }}>{label}</Typography>
      </InputLabel>
      <Select
        displayEmpty
        label={label}
        notched={true}
        error={error}
        value={selectValues}
        onChange={handleChange}
        renderValue={selected => {
          const renderValue = data.find(x => x.key === (selected as string));
          if (renderValue === undefined) {
            return <Typography sx={{ color: '#A9A9A9', marginLeft: 1 }}>{placeholder}</Typography>;
          }
          return <Chip label={renderValue.value} />;
        }}
        {...restProps}
      >
        {noneValue}
        {data.map((item, index) => (
          <MenuItem key={index} value={item.key} sx={{ padding: '5px' }}>
            <Checkbox checked={selectValues === item.key} />
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
    color: 'rgba(13, 13, 13) !important',
    marginLeft: '10px',
  },

  '& .MuiOutlinedInput-notchedOutline legend': {
    marginLeft: '10px',
  },

  '& .MuiInputBase-formControl': {
    height: '50px !important',
  },

  '& .MuiOutlinedInput-input': {
    minWidth: '94%',
    padding: '12px',
    color: 'rgba(13, 13, 13, 0.8) !important',
  },

  '& .MuiOutlinedInput-root': {
    borderRadius: '50px !important',
    '& fieldset': {
      borderWidth: '1px !important',
      borderColor: error === false ? 'rgba(13, 13, 13, 0.8) !important' : '#ff0000',
    },
    '&:hover fieldset': {
      borderColor: '#00b2ff !important',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00b2ff !important',
    },
  },

  '& label': {
    fontSize: '16px',
    color: 'rgba(13, 13, 13) !important',

    '&.MuiInputLabel-outlined': {
      top: '-8px',
    },

    '&.MuiInputLabel-shrink': {
      top: 0,
    },
  },
}));

export default SelectInput;
