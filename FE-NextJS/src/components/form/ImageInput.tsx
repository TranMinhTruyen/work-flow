'use client';
import { FileData } from '@/common/model/FileData';
import UncontrolledImageInput, {
  ImageInputProps as UncontrolledImageInputProps,
} from '@/components/inputs/ImageInput';
import { useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';

export type ImageInputProps = UncontrolledImageInputProps & {
  name: string;
  control: Control;
};

const ImageInput = (props: ImageInputProps) => {
  const { name, control, value: valueProps, onChange: onChangeProps, ...restProps } = props;

  const handleOnChange = useCallback(
    (onChange: (...event: unknown[]) => void) => (value: FileData) => {
      onChange(value);
      onChangeProps?.(value);
    },
    [onChangeProps]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value = valueProps, onChange } }) => (
        <UncontrolledImageInput value={value} onChange={handleOnChange(onChange)} {...restProps} />
      )}
    />
  );
};
export default ImageInput;
