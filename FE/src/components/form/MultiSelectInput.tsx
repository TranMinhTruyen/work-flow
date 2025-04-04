import { useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';

import { FormContext } from '@/common/constants/typeConst';
import useInput from '@/common/hooks/useInput';
import { isNullOrEmpty } from '@/common/utils/stringUtil';
import UncontrolledMultiSelectInput, {
  MultiSelectInputProps as UncontrolledMultiSelectInputProps,
} from '@/components/inputs/MultiSelectInput';

export type MultiSelectInputProps = UncontrolledMultiSelectInputProps & {
  name: string;
  label?: string;
  control: Control<any, FormContext>;
};

const MultiSelectInput = (props: MultiSelectInputProps) => {
  const {
    name,
    control,
    required,
    value: valueProps,
    onChange: onChangeProps,
    onBlur: onBlurProps,
    ...restProps
  } = props;

  const { setIsCheck, checkDataInput, translateLabel, translateError } = useInput<string[]>({
    ...props,
  });

  const handleOnChange = useCallback(
    (onChange: (...event: unknown[]) => void) => (value: string[]) => {
      control?.setError(name, { type: 'valid' });
      setIsCheck(true);
      onChange(value);
      onChangeProps?.(value);
    },
    [control, name, onChangeProps, setIsCheck]
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
        required: required ? 'isRequired' : '',
      }}
      render={({ field: { onChange, value = valueProps }, fieldState: { error } }) => (
        <UncontrolledMultiSelectInput
          label={translateLabel()}
          value={value ?? []}
          onChange={handleOnChange(onChange)}
          onBlur={handleOnBlur}
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
export default MultiSelectInput;
