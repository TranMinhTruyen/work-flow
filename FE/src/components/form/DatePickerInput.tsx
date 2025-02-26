import { DateType, FormContext } from '@/common/constants/typeConst';
import useInput from '@/common/hooks/useInput';
import { isNullOrEmpty } from '@/common/utils/stringUtil';
import UncontrolledDatePickerInput, {
  DatePickerProps as UncontrolledDatePickerProps,
} from '@/components/inputs/DatePickerInput';
import { useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';

export type DatePickerInputProps = UncontrolledDatePickerProps & {
  name: string;
  control: Control<any, FormContext>;
};

const DatePickerInput = (props: DatePickerInputProps) => {
  const {
    name,
    control,
    required,
    inputFormat = 'DD/MM/YYYY',
    value: valueProps,
    onChange: onChangeProps,
    onBlur: onBlurProps,
    ...restProps
  } = props;

  const { setIsCheck, checkDataInput, translateLabel, translateError } = useInput<DateType>({
    ...props,
  });

  const handleOnChange = useCallback(
    (onChange: (...event: unknown[]) => void) => (value: DateType) => {
      control?.setError(name, { type: 'valid' });
      setIsCheck(true);
      onChange(value);
      onChangeProps?.(value);
    },
    [control, name, onChangeProps, setIsCheck]
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
        required: required ? 'isRequired' : '',
      }}
      render={({ field: { value = valueProps, onChange }, fieldState: { error } }) => (
        <UncontrolledDatePickerInput
          label={translateLabel()}
          value={value ?? ''}
          inputFormat={inputFormat}
          onChange={handleOnChange(onChange)}
          onBlur={handleOnBlur}
          onClose={handleOnBlur}
          error={error && error.type !== 'valid'}
          helperText={
            error && error.type !== 'valid' && !isNullOrEmpty(error.message)
              ? translateError(error.message)
              : undefined
          }
          {...restProps}
        />
      )}
    />
  );
};

export default DatePickerInput;
