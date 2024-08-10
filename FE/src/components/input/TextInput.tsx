import { styled } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export type TextInputProps = TextFieldProps & {
  label?: string;
  width?: number;
};

const TextInput = (props: TextInputProps) => {
  const { label, width, ...restProps } = props;
  return <StyledTextInput size="small" sx={{ width: width }} label={label} {...restProps} />;
};

const StyledTextInput = styled(TextField)({
  width: 200,
  borderRadius: 50,
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
      WebkitBoxShadow: '0 0 0 1000px rgba(255, 255, 255) inset',
      borderRadius: 50,
    },
  },
});

export default TextInput;
