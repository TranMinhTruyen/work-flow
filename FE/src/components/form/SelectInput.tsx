import { isNullOrEmpry } from 'common/utils/stringUtil';
import UncontrolledSelectInput, {
  SelectInputProps as UncontrolledSelectInputProps,
} from 'components/input/SelectInput';
import { useCallback } from 'react';
import { Controller, UseControllerProps } from 'react-hook-form';

export type SelectInputProps = UncontrolledSelectInputProps & {
  name: string;
  control?: UseControllerProps['control'];
  required?: boolean;
  helperText?: string;
};

const SelectInput = (props: SelectInputProps) => {
  const {
    label,
    name,
    control,
    required,
    value: valueProps,
    onChange: onChangeProps,
    onBlur: onBlurProps,
    ...restProps
  } = props;

  const handleOnChange = useCallback(
    (onChange: (...event: any[]) => void) => (value: string) => {
      onChange(value);
      onChangeProps?.(value);
    },
    [onChangeProps]
  );

  const handleOnBlur = useCallback(
    (value: string) => {
      if (required && isNullOrEmpry(value)) {
        control?.setError(name, { type: 'required', message: `${label} is required!` });
      } else {
        control?.setError(name, { type: 'valid' });
      }
      onBlurProps?.(value);
    },
    [control, label, name, onBlurProps, required]
  );

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? `${label} is required!` : '',
      }}
      render={({ field: { value = valueProps, onChange }, fieldState: { error } }) => (
        <UncontrolledSelectInput
          label={label}
          value={value ?? ''}
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

export default SelectInput;
