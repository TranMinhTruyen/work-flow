import UncontrolledMultiSelectInput from 'components/input/MultiSelectInput';
import { MultiSelectInputProps as UncontrolledMultiSelectInputProps } from 'components/input/MultiSelectInput';
import { useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';

export type MultiSelectInputProps = UncontrolledMultiSelectInputProps & {
  name: string;
  label?: string;
  control: Control;
};

const MultiSelectInput = (props: MultiSelectInputProps) => {
  const {
    name,
    label,
    control,
    required,
    value: valueProps,
    onChange: onChangeProps,
    onBlur: onBlurProps,
    ...restProps
  } = props;

  const checkRequired = useCallback(
    (value: string[]) => {
      if (required && value.length === 0) {
        control?.setError(name, { type: 'required', message: `${label} is required!` });
      } else {
        control?.setError(name, { type: 'valid' });
      }
    },
    [control, label, name, required]
  );

  const handleOnChange = useCallback(
    (onChange: (...event: any[]) => void) => (value: string[]) => {
      control?.setError(name, { type: 'valid' });
      onChange(value);
      onChangeProps?.(value);
    },
    [control, name, onChangeProps]
  );

  const handleOnBlur = useCallback(
    (value: string[]) => {
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
      render={({ field: { onChange, value = valueProps }, fieldState: { error } }) => (
        <UncontrolledMultiSelectInput
          label={label}
          value={value ?? []}
          onChange={handleOnChange(onChange)}
          onBlur={handleOnBlur}
          error={!!(error && error.type !== 'valid')}
          helperText={!!error ? error.message : null}
          {...restProps}
        />
      )}
    />
  );
};
export default MultiSelectInput;
