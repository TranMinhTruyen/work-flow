import UncontrolledFileInput, {
  FileInputProps as UncontrolledFileInputProps,
} from 'components/input/FileInput';
import { Controller, UseControllerProps } from 'react-hook-form';

export type FileInputProps = Omit<UncontrolledFileInputProps, 'onChange' | 'onBlur'> & {
  name: string;
  control?: UseControllerProps['control'];
  required?: boolean;
  onChange?: (value: Uint8Array | null) => void;
};

const FileInput = (props: FileInputProps) => {
  const { name, control, label, width, required, onChange, ...restProps } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? `${label} is required!` : '',
      }}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <UncontrolledFileInput
          label={label}
          width={width}
          onChange={onChange}
          error={!!error}
          helperText={error?.message}
          {...restProps}
        />
      )}
    />
  );
};
export default FileInput;
