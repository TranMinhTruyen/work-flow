import { I18nEnum } from 'common/enums/i18nEnum';
import useCheckRequired from 'common/hooks/useCheckRequied';
import { isNullOrEmpty } from 'common/utils/stringUtil';
import UncontrolledTextInput, {
  TextInputProps as UncontrolledTextInputProps,
} from 'components/inputs/TextInput';
import { useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';

export type TextInputProps = UncontrolledTextInputProps & {
  name: string;
  control: Control;
  i18n: I18nEnum;
  defaultValue?: string | number | boolean;
  messageErr?: string;
};

const TextInput = (props: TextInputProps) => {
  const {
    name,
    control,
    i18n,
    label,
    type,
    value: valueProps,
    messageErr,
    required,
    slotProps,
    onChange: onChangeProps,
    onBlur: onBlurProps,
    ...restProps
  } = props;

  const { checkDataInput, translateLabel, translateError } = useCheckRequired<string>({
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
          slotProps={slotProps}
          {...restProps}
        />
      )}
    />
  );
};

export default TextInput;
