import useInput from 'common/hooks/useInput';
import { isNullOrEmpty } from 'common/utils/stringUtil';
import UncontrolledTextInput, {
  TextInputProps as UncontrolledTextInputProps,
} from 'components/inputs/TextInput';
import { useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';

export type TextInputProps = UncontrolledTextInputProps & {
  name: string;
  control: Control;
  defaultValue?: string | number | boolean;
  messageErr?: string;
};

const TextInput = (props: TextInputProps) => {
  const {
    name,
    control,
    label,
    type,
    value: valueProps,
    messageErr,
    required,
    onChange: onChangeProps,
    onBlur: onBlurProps,
    ...restProps
  } = props;

  const { checkDataInput, translateLabel, translateError } = useInput<string>({
    ...props,
  });

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
        required: required,
      }}
      render={({ field: { value = valueProps, onChange }, fieldState: { error } }) => (
        <UncontrolledTextInput
          label={translateLabel()}
          type={type}
          value={value ?? ''}
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

export default TextInput;
