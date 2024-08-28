import { Controller, UseControllerProps } from 'react-hook-form';
import UncontrolledDatePickerInput, {
  DatePickerProps as UncontrolledDatePickerProps,
} from 'components/input/DatePickerInput';
import { useCallback } from 'react';
import { isNullOrEmpry } from 'common/utils/stringUtil';

export type DatePickerInputProps = UncontrolledDatePickerProps & {
  name: string;
  control?: UseControllerProps['control'];
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

  const checkRequired = useCallback(
    (value: string) => {
      if (required && (value === inputFormat || isNullOrEmpry(value))) {
        control?.setError(name, { type: 'required', message: `${label} is required!` });
      } else {
        control?.setError(name, { type: 'valid' });
      }
    },
    [control, inputFormat, label, name, required]
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
