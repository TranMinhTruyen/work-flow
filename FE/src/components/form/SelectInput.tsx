import useCheckRequired from 'common/hooks/useCheckRequied';
import { isNullOrEmpty } from 'common/utils/stringUtil';
import UncontrolledSelectInput, {
  SelectInputProps as UncontrolledSelectInputProps,
} from 'components/input/SelectInput';
import { useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';

export type SelectInputProps = UncontrolledSelectInputProps & {
  name: string;
  control: Control;
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

  const { checkDataInput } = useCheckRequired<string>({ ...props });

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
