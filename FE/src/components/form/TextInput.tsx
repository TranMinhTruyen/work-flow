import UncontrolledTextInput, {
  TextInputProps as UncontrolledTextInputProps,
} from 'components/input/TextInput';
import { Controller, UseControllerProps } from 'react-hook-form';

export type TextInputProps = Omit<UncontrolledTextInputProps, 'onChange' | 'onBlur'> & {
  name: string;
  control?: UseControllerProps['control'];
  defaultValue?: string | number | boolean;
  messageErr?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
};

const TextInput = (props: TextInputProps) => {
  const {
    name,
    control,
    defaultValue,
    messageErr,
    required,
    inputProps,
    width,
    onChange,
    onBlur,
    label,
    ...restProps
  } = props;

  const handleOnBlur = (value: any) => () => {
    if (required && (value === undefined || value === null || value === '')) {
      control?.setError(name, { type: 'required', message: `${label} is required!` });
    } else {
      control?.setError(name, { type: 'valid' });
    }
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required: required,
      }}
      render={({ field: { onChange, value = '' }, fieldState: { error } }) => (
        <UncontrolledTextInput
          width={width}
          label={label}
          value={value ?? ''}
          onChange={onChange}
          onBlur={handleOnBlur(value)}
          error={!!(error && error.type !== 'valid')}
          helperText={!!error ? error.message : null}
          inputProps={{
            ...inputProps,
            'text-input-id': name,
          }}
          {...restProps}
        />
      )}
    />
  );
};

export default TextInput;
