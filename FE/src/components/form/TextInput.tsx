import { isNullOrEmpry } from 'common/utils/stringUtil';
import UncontrolledTextInput, {
  TextInputProps as UncontrolledTextInputProps,
} from 'components/input/TextInput';
import { useCallback } from 'react';
import { Controller, UseControllerProps } from 'react-hook-form';

export type TextInputProps = UncontrolledTextInputProps & {
  name: string;
  control?: UseControllerProps['control'];
  defaultValue?: string | number | boolean;
  messageErr?: string;
};

const TextInput = (props: TextInputProps) => {
  const {
    name,
    control,
    label,
    type,
    value: valueProps,
    messageErr,
    required,
    inputProps,
    onChange: onChangeProps,
    onBlur: onBlurProps,
    ...restProps
  } = props;

  const checkDataInput = useCallback(
    (value: string): boolean => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
      if (type === 'email' && !emailPattern.test(value)) {
        control?.setError(name, { type: 'format', message: `${label} format email error!` });
        return false;
      }
      return true;
    },
    [control, label, name, type]
  );

  const checkRequired = useCallback(
    (value: string) => {
      if (required && isNullOrEmpry(value)) {
        control?.setError(name, { type: 'required', message: `${label} is required!` });
      } else if (checkDataInput(value)) {
        control?.setError(name, { type: 'valid' });
      }
    },
    [checkDataInput, control, label, name, required]
  );

  const handleOnChange = useCallback(
    (onChange: (...event: any[]) => void) => (value: string) => {
      checkRequired(value);
      onChange(value);
      onChangeProps?.(value);
    },
    [checkRequired, onChangeProps]
  );

  const handleOnBlur = useCallback(
    (value: string) => {
      checkRequired(value);
      onBlurProps?.(value);
    },
    [checkRequired, onBlurProps]
  );

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? `${label} is required!` : '',
      }}
      render={({ field: { value = valueProps, onChange }, fieldState: { error } }) => (
        <UncontrolledTextInput
          label={label}
          type={type}
          value={value ?? ''}
          onChange={handleOnChange(onChange)}
          onBlur={handleOnBlur}
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
