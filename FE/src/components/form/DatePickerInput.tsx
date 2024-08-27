import { Controller, UseControllerProps } from 'react-hook-form';
import UncontrolledDatePickerInput, {
  DatePickerProps as UncontrolledDatePickerProps,
} from 'components/input/DatePickerInput';
import { useCallback } from 'react';
import { isNullOrEmpry } from 'common/utils/stringUtil';

export type DatePickerInputProps = Omit<
  UncontrolledDatePickerProps,
  'onChange' | 'onBlur' | 'onFocus'
> & {
  name: string;
  control?: UseControllerProps['control'];
  onChange?: (value: string) => void;
  onFocus?: (value: string) => void;
  onBlur?: (value: string) => void;
};

const DatePickerInput = (props: DatePickerInputProps) => {
  const {
    name,
    control,
    value: valueProps,
    defaultValue,
    required,
    onChange: onChangeProps,
    onFocus,
    onBlur,
    label,
    width,
    height,
    inputFormat = 'DD/MM/YYYY',
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
      if ((required && value === inputFormat) || isNullOrEmpry(value)) {
        control?.setError(name, { type: 'required', message: `${label} is required!` });
      } else {
        control?.setError(name, { type: 'valid' });
      }
      onBlur?.(value);
    },
    [control, inputFormat, label, name, onBlur, required]
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
          height={height}
          width={width}
          value={value}
          inputFormat={inputFormat}
          defaultValue={defaultValue}
          label={label}
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
