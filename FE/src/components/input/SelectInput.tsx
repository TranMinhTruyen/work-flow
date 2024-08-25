import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { SelectDataType } from 'common/constants/type';
import { ReactNode, useCallback, useMemo, useState } from 'react';

type SelectInputProps = Omit<SelectProps, 'multiple' | 'defaultValue' | 'displayEmpty'> & {
  label?: string;
  width?: number;
  data: SelectDataType[];
  defaultValue?: string;
  displayNone?: boolean;
};

const ITEM_HEIGHT = 36;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 8 + ITEM_PADDING_TOP * 2,
    },
  },
};

const SelectInput = (props: SelectInputProps) => {
  const {
    label,
    width = 200,
    data,
    onChange,
    defaultValue,
    placeholder,
    displayNone,
    ...restProps
  } = props;

  const [value, setValue] = useState<string>(defaultValue ?? '');

  const handleChange = useCallback(
    (event: SelectChangeEvent<any>, child: ReactNode) => {
      setValue(event.target.value);
      if (onChange) {
        onChange(event, child);
      }
    },
    [onChange]
  );

  const noneValue = useMemo(() => {
    return (
      displayNone && (
        <MenuItem value={''} sx={{ padding: '5px' }}>
          <Checkbox checked={value === ''} />
          <Typography>None</Typography>
        </MenuItem>
      )
    );
  }, [displayNone, value]);

  return (
    <Box sx={{ width: width }}>
      <FormControlStyled fullWidth>
        <InputLabel shrink={true}>
          <Typography sx={{ color: 'rgba(13, 13, 13)' }}>{label}</Typography>
        </InputLabel>
        <Select
          displayEmpty
          label={label}
          notched={true}
          value={value}
          onChange={handleChange}
          renderValue={selected => {
            const renderValue = data.find(x => x.key === (selected as string));
            if (renderValue === undefined) {
              return (
                <Typography sx={{ color: '#A9A9A9', marginLeft: 1 }}>{placeholder}</Typography>
              );
            }
            return <Typography>{renderValue.value}</Typography>;
          }}
          {...restProps}
        >
          {noneValue}
          {data.map((item, index) => (
            <MenuItem key={index} value={item.key} sx={{ padding: '5px' }}>
              <Checkbox checked={value === item.key} />
              <Typography>{item.value}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControlStyled>
    </Box>
  );
};

const FormControlStyled = styled(FormControl)({
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
      borderColor: 'rgba(13, 13, 13, 0.8) !important',
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
    color: 'rgba(13, 13, 13, 0.8) !important',

    '&.MuiInputLabel-outlined': {
      top: '-8px',
    },

    '&.MuiInputLabel-shrink': {
      top: 0,
    },
  },
});

export default SelectInput;
