import styled from '@emotion/styled';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { SelectDataType } from 'common/constants/type';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';

export type SelectInputProps = Omit<
  SelectProps,
  'multiple' | 'defaultValue' | 'displayEmpty' | 'value' | 'onChange' | 'onBlur'
> & {
  label?: string;
  width?: number;
  value?: string;
  data: SelectDataType[];
  defaultValue?: string;
  displayNone?: boolean;
  helperText?: string | null;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
};

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 5;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectInput = (props: SelectInputProps) => {
  const {
    label,
    width = 200,
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

  useLayoutEffect(() => {
    if (valueProps !== undefined && selectValue.includes(valueProps)) {
      return;
    }
    if (valueProps !== undefined) {
      setSelectValue(valueProps);
    }
  }, [selectValue, valueProps]);

  const handleOnChange = useCallback(
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
    <FormControlStyled sx={{ width: width }} error={error}>
      <InputLabel shrink={true}>
        <Typography sx={{ color: 'rgba(13, 13, 13)' }}>{label}</Typography>
      </InputLabel>
      <Select
        displayEmpty
        label={label}
        notched={true}
        error={error}
        value={selectValue}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        renderValue={selected => {
          const renderValue = data.find(x => x.key === (selected as string));
          if (renderValue === undefined) {
            return <Typography sx={{ color: '#A9A9A9', marginLeft: 1 }}>{placeholder}</Typography>;
          }
          return <Chip label={renderValue.value} />;
        }}
        MenuProps={MenuProps}
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
    color: 'rgba(13, 13, 13) !important',
    marginLeft: '10px',
  },

  '& .MuiOutlinedInput-notchedOutline legend': {
    marginLeft: '10px',
  },

  '& .MuiInputBase-formControl': {
    height: '50px !important',
    minHeight: '50px !important',
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
