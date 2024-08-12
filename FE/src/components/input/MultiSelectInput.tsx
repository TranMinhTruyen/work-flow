import { styled } from '@mui/material/styles';
import { SelectDataType } from './SelectInput';
import Select, { SelectProps } from '@mui/material/Select';
import { useMemo, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';

export type MultiSelectInputProps = Omit<SelectProps, 'multiple'> & {
  label?: string;
  width?: number;
  data: SelectDataType[];
};

const MultiSelectInput = (props: MultiSelectInputProps) => {
  const { label, width = 200, data, value: propsValue, onChange, ...restProps } = props;

  const [values, setValues] = useState<any[]>([]);

  const selectValues = useMemo(() => {
    return ((propsValue as any[]) || values).filter(value =>
      (data || []).some(item => item.value == value)
    );
  }, [data, propsValue, values]);

  const handleChange: SelectProps<any[]>['onChange'] = (event, child) => {
    if (onChange) {
      onChange(event, child);
    }

    if (propsValue !== undefined) return;

    const {
      target: { value },
    } = event;

    // On autofill we get a stringified value.
    let newValues: any[];
    if (typeof value === 'number') {
      newValues = [value];
    } else if (typeof value === 'string') {
      newValues = value.split(',');
    } else {
      newValues = value;
    }

    setValues(newValues);
  };

  return (
    <FormControlStyled fullWidth sx={{ width: width }}>
      <Select
        value={selectValues}
        input={<OutlinedInput label={label} />}
        // @ts-ignore
        defaultValue={[]}
        // @ts-ignore
        onChange={handleChange}
        // @ts-ignore
        multiple
        renderValue={selected => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map(value => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        {...restProps}
      >
        {data.map(item => (
          <MenuItem key={item.key} value={item.value}>
            <ListItemText primary={item.value} />
          </MenuItem>
        ))}
      </Select>
    </FormControlStyled>
  );
};
export default MultiSelectInput;

const FormControlStyled = styled(FormControl)({
  '& .MuiInputBase-formControl': {
    '& .MuiInputBase-input': {},
  },

  '& .MuiOutlinedInput-input': {
    minWidth: '94%',
  },

  '& label': {
    fontSize: '13px',
    color: '#aca8b7',

    '&.MuiInputLabel-outlined': {
      top: '-3px',
    },

    '&.MuiInputLabel-shrink': {
      top: 0,
      color: '#aca8b7',
    },
  },

  '& fieldset': {
    borderWidth: '1px !important',
    borderRadius: '50px !important',
    borderColor: 'rgba(13, 13, 13, 0.8) !important',
  },

  '&:hover fieldset': {
    borderColor: '#00b2ff !important',
  },

  '& .Mui-focused fieldset': {
    borderColor: '#007fb6 !important',
  },

  '& .Mui-disabled': {
    backgroundColor: 'rgb(220 220 220 / 20%) !important',
  },

  '& .MuiFormHelperText-root': {
    marginLeft: 0,
  },
});
