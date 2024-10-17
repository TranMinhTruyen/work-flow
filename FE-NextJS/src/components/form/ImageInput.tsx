'use client';
import UncontrolledImageInput, {
  ImageInputProps as UncontrolledImageInputProps,
} from '@/components/inputs/ImageInput';
import { Control, Controller } from 'react-hook-form';

export type ImageInputProps = UncontrolledImageInputProps & {
  name: string;
  control: Control;
};

const ImageInput = (props: ImageInputProps) => {
  const { name, control, value: valueProps, ...restProps } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value = valueProps } }) => (
        <UncontrolledImageInput value={value} onChange={onChange} {...restProps} />
      )}
    />
  );
};
export default ImageInput;
