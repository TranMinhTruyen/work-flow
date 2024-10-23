'use client';
import { Control, Controller } from 'react-hook-form';
import UncontrolledDatePickerInput, {
  DatePickerProps as UncontrolledDatePickerProps,
} from '@/components/inputs/DatePickerInput';
import { useCallback } from 'react';
import useInput from '@/common/hooks/useInput';
import { isNullOrEmpty } from '@/common/utils/stringUtil';

export type DatePickerInputProps = UncontrolledDatePickerProps & {
  name: string;
  control: Control;
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

  const { checkDataInput, translateLabel, translateError } = useInput<string>({ ...props });

  const handleOnChange = useCallback(
    // eslint-disable-next-line no-unused-vars
    (onChange: (...event: unknown[]) => void) => (value: string) => {
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
        required: required ? 'isRequired' : '',
      }}
      render={({ field: { value = valueProps, onChange }, fieldState: { error } }) => (
        <UncontrolledDatePickerInput
          label={translateLabel()}
          value={value}
          inputFormat={inputFormat}
          onChange={handleOnChange(onChange)}
          onBlur={handleOnBlur}
          onClose={handleOnBlur}
          error={!!(error && error.type !== 'valid')}
          helperText={
            !!(error && error.type !== 'valid' && !isNullOrEmpty(error.message))
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
