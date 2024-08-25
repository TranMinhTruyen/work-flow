import { styled } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export type TextInputProps = TextFieldProps & {
  label?: string;
  width?: number;
};

const TextInput = (props: TextInputProps) => {
  const { label, width, ...restProps } = props;
  return (
    <StyledTextInput
      sx={{ width: width }}
      label={label}
      InputLabelProps={{
        shrink: true,
      }}
      {...restProps}
    />
  );
};

const StyledTextInput = styled(TextField)({
  borderRadius: 50,
  '& .MuiOutlinedInput-root': {
    height: 50,
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

  '& .MuiInputLabel-root': {
    color: 'rgba(13, 13, 13)',
  },

  input: {
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px rgba(255, 255, 255) inset',
      borderRadius: 50,
    },
  },
});

export default TextInput;
