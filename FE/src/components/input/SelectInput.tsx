import { MenuItem, styled, TextField, TextFieldProps } from '@mui/material';

type SelectInputProps = TextFieldProps & {
  label?: string;
  width?: number;
  data: SelcetDataType[];
};

export type SelcetDataType = {
  key?: any;
  value?: any;
};

const SelectInput = (props: SelectInputProps) => {
  const { label, width, data, ...restProps } = props;
  return (
    <StyledSelectInput select size="small" sx={{ width: width }} label={label} {...restProps}>
      {data.map(item => (
        <MenuItem key={item.key} value={item.value}>
          {item.value}
        </MenuItem>
      ))}
    </StyledSelectInput>
  );
};

const StyledSelectInput = styled(TextField)({
  width: 200,
  '& .MuiOutlinedInput-root': {
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
      WebkitBoxShadow: '0 0 0 1000px rgba(210, 210, 210, 0.8) inset',
    },
  },
});

export default SelectInput;
