import { FormContext } from '@/common/constants/typeConst';
import UncontrolledSwitchInput, {
  SwitchInputProps as UncontrolledSwitchInputProps,
} from '@/components/inputs/SwitchInput';
import { Control, Controller } from 'react-hook-form';

export type SwitchInputProps = UncontrolledSwitchInputProps & {
  name: string;
  control?: Control<any, FormContext>;
};

const SwitchInput = (props: SwitchInputProps) => {
  const { name, control, defaultValue, disabled, ...restProps } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value = '' } }) => (
        <UncontrolledSwitchInput
          checked={value}
          onChange={onChange}
          disabled={disabled}
          {...restProps}
        />
      )}
    />
  );
};

export default SwitchInput;
