'use client';
import UncontrolledCheckBoxInput, {
  CheckBoxProps as UncontrolledCheckboxProps,
} from '~/components/inputs/CheckboxInput';
import { Controller, UseControllerProps } from 'react-hook-form';

export type CheckboxProps = UncontrolledCheckboxProps & {
  name: string;
  control?: UseControllerProps['control'];
};

const CheckBox = (props: CheckboxProps) => {
  const { name, control, defaultValue, disabled, ...restProps } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value = '' } }) => (
        <UncontrolledCheckBoxInput
          checked={value}
          onChange={onChange}
          disabled={disabled}
          {...restProps}
        />
      )}
    />
  );
};

export default CheckBox;
