import UncontrolledCheckBoxInput, {
  CheckBoxProps as UncontrolledCheckboxProps,
} from 'components/input/CheckboxInput';
import { Controller, ControllerRenderProps, UseControllerProps } from 'react-hook-form';

export type CheckboxProps = UncontrolledCheckboxProps & {
  name: string;
  control?: UseControllerProps['control'];
  disabled?: boolean;
};

const CheckBox = (props: CheckboxProps) => {
  const { name, control, defaultValue, label } = props;

  const handleOnChange =
    (field: ControllerRenderProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      field.onChange(checked);
    };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <UncontrolledCheckBoxInput
          label={label}
          checked={field.value}
          onChange={handleOnChange(field)}
        />
      )}
    />
  );
};

export default CheckBox;
