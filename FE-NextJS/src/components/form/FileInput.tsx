'use client';

import { I18nEnum } from '@/common/enums/I18nEnum';
import useInput from '@/common/hooks/useInput';
import { FileData } from '@/common/model/FileData';
import { isNullOrEmpty } from '@/common/utils/stringUtil';
import UncontrolledFileInput, {
  FileInputProps as UncontrolledFileInputProps,
} from '@/components/inputs/FileInput';
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
    required,
    value: valueProps,
    onChange: onChangeProps,
    onBlur: onBlurProps,
    ...restProps
  } = props;

  const { setIsCheck, checkDataInput, translateLabel, translateError } = useInput<FileData[]>({
    ...props,
  });

  const handleOnChange = useCallback(
    (onChange: (...event: unknown[]) => void) => (value: FileData[]) => {
      control?.setError(name, { type: 'valid' });
      setIsCheck(true);
      onChange(value);
      onChangeProps?.(value);
    },
    [control, name, onChangeProps, setIsCheck]
  );

  const handleOnBlur = useCallback(
    (value: FileData[]) => {
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
        <UncontrolledFileInput
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
export default FileInput;
