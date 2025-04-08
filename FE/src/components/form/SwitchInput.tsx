import { Control, Controller } from 'react-hook-form';

import { FormContext } from '@/common/constants/typeConst';
import useInput from '@/common/hooks/useInput';
import UncontrolledSwitchInput, {
  SwitchInputProps as UncontrolledSwitchInputProps,
} from '@/components/inputs/SwitchInput';

export type SwitchInputProps = UncontrolledSwitchInputProps & {
  name: string;
  control: Control<any, FormContext>;
};

const SwitchInput = (props: SwitchInputProps) => {
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
        <UncontrolledSwitchInput
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

export default SwitchInput;
