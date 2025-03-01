import { useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';

import { FormContext } from '@/common/constants/typeConst';
import useInput from '@/common/hooks/useInput';
import { isNullOrEmpty } from '@/common/utils/stringUtil';
import UncontrolledTextInput, {
  TextInputProps as UncontrolledTextInputProps,
} from '@/components/inputs/TextInput';

export type TextInputProps = UncontrolledTextInputProps & {
  name: string;
  defaultValue?: string | number | boolean;
  control: Control<any, FormContext>;
};

const TextInput = (props: TextInputProps) => {
  const {
    name,
    control,
    type,
    value: valueProps,
    required,
    onChange: onChangeProps,
    onBlur: onBlurProps,
    ...restProps
  } = props;

  const { setIsCheck, checkDataInput, translateLabel, translateError } = useInput<string>({
    ...props,
  });

  const handleOnChange = useCallback(
    (onChange: (...event: unknown[]) => void) => (value: string) => {
      control.setError(name, { type: 'valid' });
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
        <UncontrolledTextInput
          id={name}
          label={translateLabel()}
          autoComplete={name}
          type={type}
          value={value ?? ''}
          onChange={handleOnChange(onChange)}
          onBlur={handleOnBlur}
          error={error && error.type !== 'valid'}
          helperText={
            error && error.type !== 'valid' && !isNullOrEmpty(error.message)
              ? translateError(error.message, error.type)
              : undefined
          }
          {...restProps}
        />
      )}
    />
  );
};

export default TextInput;
