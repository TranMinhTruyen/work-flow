import UncontrolledCheckBoxInput, {
  CheckBoxProps as UncontrolledCheckboxProps,
} from 'components/input/CheckboxInput';
import { Controller, UseControllerProps } from 'react-hook-form';

export type CheckboxProps = UncontrolledCheckboxProps & {
  name: string;
  control?: UseControllerProps['control'];
  disabled?: boolean;
};

const CheckBox = (props: CheckboxProps) => {
  const { name, control, defaultValue, label, disabled, ...restProps } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value = '' } }) => (
        <UncontrolledCheckBoxInput
          label={label}
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
