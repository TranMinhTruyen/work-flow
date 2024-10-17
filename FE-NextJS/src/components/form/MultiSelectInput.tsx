'use client';
import useInput from '@/common/hooks/useInput';
import { isNullOrEmpty } from '@/common/utils/stringUtil';
import UncontrolledMultiSelectInput from '@/components/inputs/MultiSelectInput';
import { MultiSelectInputProps as UncontrolledMultiSelectInputProps } from '@/components/inputs/MultiSelectInput';
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

  const { checkDataInput, translateLabel, translateError } = useInput<string[]>({ ...props });

  const handleOnChange = useCallback(
    // eslint-disable-next-line no-unused-vars
    (onChange: (...event: unknown[]) => void) => (value: string[]) => {
      control?.setError(name, { type: 'valid' });
      onChange(value);
      onChangeProps?.(value);
    },
    [control, name, onChangeProps]
  );

  const handleOnBlur = useCallback(
    (value: string[]) => {
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
      render={({ field: { onChange, value = valueProps }, fieldState: { error } }) => (
        <UncontrolledMultiSelectInput
          label={translateLabel()}
          value={value ?? []}
          onChange={handleOnChange(onChange)}
          onBlur={handleOnBlur}
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
export default MultiSelectInput;
