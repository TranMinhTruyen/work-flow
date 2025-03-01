import { Control, Controller } from 'react-hook-form';

import { FormContext } from '@/common/constants/typeConst';
import useInput from '@/common/hooks/useInput';
import UncontrolledCheckBoxInput, {
  CheckBoxProps as UncontrolledCheckboxProps,
} from '@/components/inputs/CheckBoxInput';

export type CheckboxProps = UncontrolledCheckboxProps & {
  name: string;
  control: Control<any, FormContext>;
};

const CheckBoxInput = (props: CheckboxProps) => {
  const { name, control, defaultValue, disabled, ...restProps } = props;

  const { translateLabel } = useInput<boolean>({
    ...props,
  });

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value = '' } }) => (
        <UncontrolledCheckBoxInput
          id={name}
          label={translateLabel()}
          checked={value}
          onChange={onChange}
          disabled={disabled}
          {...restProps}
        />
      )}
    />
  );
};

export default CheckBoxInput;
