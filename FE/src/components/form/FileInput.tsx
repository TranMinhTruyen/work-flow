import UncontrolledFileInput, {
  FileInputProps as UncontrolledFileInputProps,
} from 'components/input/FileInput';
import { Controller, UseControllerProps } from 'react-hook-form';

export type FileInputProps = UncontrolledFileInputProps & {
  name: string;
  control?: UseControllerProps['control'];
  required?: boolean;
};

const FileInput = (props: FileInputProps) => {
  const { name, control, label, required, onChange: onChangeProps, ...restProps } = props;

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
