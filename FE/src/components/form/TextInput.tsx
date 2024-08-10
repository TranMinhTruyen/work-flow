import UncontrolledTextInput, {
  TextInputProps as UncontrolledTextInputProps,
} from 'components/input/TextInput';
import { Controller, Noop, UseControllerProps } from 'react-hook-form';

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
    label,
    width,
    onChange,
    onBlur,
    ...restProps
  } = props;

  const handleOnBlur = (onBlur: Noop, value: any) => () => {
    if (required && (value === undefined || value === null || value === '')) {
      control?.setError(name, { type: 'required' });
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
      render={({ field: { onBlur, onChange, value = '' }, fieldState: { error } }) => (
        <UncontrolledTextInput
          value={value ?? ''}
          onChange={onChange}
          onBlur={handleOnBlur(onBlur, value)}
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
