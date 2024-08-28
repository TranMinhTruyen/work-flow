import { FileInputData } from 'common/constants/type';
import UncontrolledFileInput, {
  FileInputProps as UncontrolledFileInputProps,
} from 'components/input/FileInput';
import { useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';

export type FileInputProps = UncontrolledFileInputProps & {
  name: string;
  control: Control;
  required?: boolean;
};

const FileInput = (props: FileInputProps) => {
  const {
    name,
    control,
    label,
    required,
    value: valueProps,
    onChange: onChangeProps,
    onBlur: onBlurProps,
    ...restProps
  } = props;

  const checkRequired = useCallback(
    (value: FileInputData[]) => {
      if (required && value.length === 0) {
        control?.setError(name, { type: 'required', message: `${label} is required!` });
      } else {
        control?.setError(name, { type: 'valid' });
      }
    },
    [control, label, name, required]
  );

  const handleOnChange = useCallback(
    (onChange: (...event: any[]) => void) => (value: FileInputData[]) => {
      control?.setError(name, { type: 'valid' });
      onChange(value);
      onChangeProps?.(value);
    },
    [control, name, onChangeProps]
  );

  const handleOnBlur = useCallback(
    (value: FileInputData[]) => {
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
      render={({ field: { onChange, value = valueProps }, fieldState: { error } }) => (
        <UncontrolledFileInput
          label={label}
          value={value}
          onChange={handleOnChange(onChange)}
          onBlur={handleOnBlur}
          error={!!(error && error.type !== 'valid')}
          helperText={!!error ? error.message : null}
          {...restProps}
        />
      )}
    />
  );
};
export default FileInput;
