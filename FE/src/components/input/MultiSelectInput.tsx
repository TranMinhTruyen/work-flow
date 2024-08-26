import { styled } from '@mui/material/styles';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { SelectDataType } from 'common/constants/type';
import InputLabel from '@mui/material/InputLabel';

export type MultiSelectInputProps = Omit<SelectProps, 'multiple'> & {
  width?: number;
  data: SelectDataType[];
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

const MultiSelectInput = (props: MultiSelectInputProps) => {
  const { width = 200, data, value: propsValue, onChange, label, ...restProps } = props;

  const [values, setValues] = useState<SelectDataType[]>([]);

  const selectValues = useMemo(() => {
    return values.filter(value => (data || []).some(item => item.key === value));
  }, [data, values]);

  const handleChange = useCallback(
    (event: SelectChangeEvent<any[]>, child: ReactNode) => {
      const currentValue = event.target.value;

      // On autofill we get a stringified value.
      let newValues: any[];
      if (typeof currentValue === 'number') {
        newValues = [currentValue];
      } else if (typeof currentValue === 'string') {
        newValues = currentValue.split(',');
      } else {
        newValues = currentValue;
      }

      setValues(newValues);

      if (onChange) {
        onChange(event, child);
      }
    },
    [onChange]
  );

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
          value={selectValues}
          // @ts-ignore
          defaultValue={selectValues}
          onChange={handleChange}
          multiple
          renderValue={selected => {
            const renderValue = data.filter(x => selected.includes(x.key));

            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {renderValue.map((item, index) => (
                  <Chip key={index} label={item.value} />
                ))}
              </Box>
            );
          }}
          MenuProps={MenuProps}
          {...restProps}
        >
          {data.map((item, index) => (
            <MenuItem key={index} value={item.key} sx={{ padding: '5px' }}>
              <Checkbox checked={selectValues.some(selectValue => selectValue === item.key)} />
              <Typography>{item.value}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControlStyled>
    </Box>
  );
};
export default MultiSelectInput;

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

  '& .MuiInputLabel-root': {
    color: 'rgba(13, 13, 13)',
    marginLeft: 10,
  },

  '& .MuiOutlinedInput-notchedOutline': {
    legend: {
      marginLeft: 10,
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
