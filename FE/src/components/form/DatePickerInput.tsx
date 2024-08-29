import { Control, Controller } from 'react-hook-form';
import UncontrolledDatePickerInput, {
  DatePickerProps as UncontrolledDatePickerProps,
} from 'components/input/DatePickerInput';
import { useCallback } from 'react';
import useCheckRequired from 'common/hooks/useCheckRequied';

export type DatePickerInputProps = UncontrolledDatePickerProps & {
  name: string;
  control: Control;
};

const DatePickerInput = (props: DatePickerInputProps) => {
  const {
    name,
    control,
    label,
    required,
    inputFormat = 'DD/MM/YYYY',
    value: valueProps,
    onChange: onChangeProps,
    onFocus: onFocusProps,
    onBlur: onBlurProps,
    ...restProps
  } = props;

  const { checkDataInput } = useCheckRequired<string>({ ...props });

  const handleOnChange = useCallback(
    (onChange: (...event: any[]) => void) => (value: string) => {
      control?.setError(name, { type: 'valid' });
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
        <UncontrolledDatePickerInput
          label={label}
          value={value}
          inputFormat={inputFormat}
          onChange={handleOnChange(onChange)}
          onBlur={handleOnBlur}
          onClose={handleOnBlur}
          error={!!(error && error.type !== 'valid')}
          helperText={!!error ? error.message : null}
          {...restProps}
        />
      )}
    />
  );
};

export default DatePickerInput;
