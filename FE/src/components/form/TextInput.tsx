import { EMAIL_PATTERN } from 'common/constants/commonConst';
import { isNullOrEmpry } from 'common/utils/stringUtil';
import UncontrolledTextInput, {
  TextInputProps as UncontrolledTextInputProps,
} from 'components/input/TextInput';
import { useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';

export type TextInputProps = UncontrolledTextInputProps & {
  name: string;
  control: Control;
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
    (value: string) => {
      if (required && isNullOrEmpry(value)) {
        control.setError(name, { type: 'required', message: `${label} is required!` });
        return;
      }

      if (type === 'email' && !EMAIL_PATTERN.test(value)) {
        control.setError(name, { type: 'format', message: `${label} format email error!` });
        return;
      }

      control.setError(name, { type: 'valid' });
    },
    [control, label, name, required, type]
  );

  const handleOnChange = useCallback(
    (onChange: (...event: any[]) => void) => (value: string) => {
      control.setError(name, { type: 'valid' });
      onChange(value);
      onChangeProps?.(value);
    },
    [control, name, onChangeProps]
  );

  const handleOnBlur = useCallback(
    (value: string) => {
      checkDataInput(value);
      onBlurProps?.(value);
    },
    [checkDataInput, onBlurProps]
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
