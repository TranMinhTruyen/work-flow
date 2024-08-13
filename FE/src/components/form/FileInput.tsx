import UncontrolledFileInput, {
  FileInputProps as UncontrolledFileInputProps,
} from 'components/input/FileInput';
import { Controller, UseControllerProps } from 'react-hook-form';

export type FileInputProps = Omit<UncontrolledFileInputProps, 'onChange' | 'onBlur'> & {
  name: string;
  control?: UseControllerProps['control'];
  onChange?: (value: Uint8Array | null) => void;
};

const FileInput = (props: FileInputProps) => {
  const { name, control, label, width, onChange, ...restProps } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <UncontrolledFileInput label={label} width={width} onChange={onChange} {...restProps} />
      )}
    />
  );
};
export default FileInput;
