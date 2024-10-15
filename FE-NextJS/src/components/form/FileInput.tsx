/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileInputData } from '../../common/constants/type';
import { I18nEnum } from '../../common/enums/i18nEnum';
import useInput from '../../common/hooks/useInput';
import { isNullOrEmpty } from '../../common/utils/stringUtil';
import UncontrolledFileInput, {
  FileInputProps as UncontrolledFileInputProps,
} from '../../components/inputs/FileInput';
import { useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';

export type FileInputProps = UncontrolledFileInputProps & {
  name: string;
  control: Control;
  i18n: I18nEnum;
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

  const { checkDataInput, translateLabel, translateError } = useInput<FileInputData[]>({
    ...props,
  });

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
        <UncontrolledFileInput
          label={translateLabel()}
          value={value}
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
export default FileInput;
