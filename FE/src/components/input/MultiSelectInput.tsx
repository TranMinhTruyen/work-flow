import { styled } from '@mui/material/styles';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import { useCallback, useLayoutEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { SelectDataType } from 'common/constants/type';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

export type MultiSelectInputProps = Omit<
  SelectProps,
  'multiple' | 'value' | 'onChange' | 'onBlur'
> & {
  width?: number;
  value?: string[];
  defaultValue?: string[];
  data: SelectDataType[];
  helperText?: string | null;
  onChange?: (value: string[]) => void;
  onBlur?: (value: string[]) => void;
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
  const {
    width = 200,
    data,
    value: valueProps,
    defaultValue,
    onChange: onChangeProps,
    onBlur: onBlurProps,
    label,
    error = false,
    helperText,
    ...restProps
  } = props;

  const [selectValues, setSelectValues] = useState<string[]>(defaultValue ?? []);

  useLayoutEffect(() => {
    if (valueProps?.every(element => selectValues.includes(element))) {
      return;
    }
    if (valueProps !== undefined) {
      setSelectValues(valueProps);
    }
  }, [selectValues, valueProps]);

  const handleOnChange = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      const currentValue = event.target.value;

      // On autofill we get a stringified value.
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
        // @ts-ignore
        defaultValue={selectValues}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        multiple
        renderValue={selected => {
          const renderValue = data.filter(item => selected.includes(item.key));
          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {renderValue.map((item, index) => (
                <Chip
                  key={index}
                  label={item.value}
                  color={'primary'}
                  onDelete={handleDelete(item.key)}
                  onMouseDown={event => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  sx={{
                    height: '30px',
                  }}
                />
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
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </FormControlStyled>
  );
};
export default MultiSelectInput;

const FormControlStyled = styled(FormControl)(({ error }) => ({
  '& .MuiInputLabel-root': {
    color: 'rgba(13, 13, 13) !important',
    marginLeft: '10px',
  },

  '& .MuiOutlinedInput-notchedOutline legend': {
    marginLeft: '10px',
  },

  '& .MuiInputBase-formControl': {
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
    color: 'rgba(13, 13, 13, 0.8) !important',

    '&.MuiInputLabel-outlined': {
      top: '-8px',
    },

    '&.MuiInputLabel-shrink': {
      top: 0,
    },
  },
}));
