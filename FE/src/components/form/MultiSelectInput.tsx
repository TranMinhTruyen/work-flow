import UncontrolledMultiSelectInput from 'components/input/MultiSelectInput';
import { MultiSelectInputProps as UncontrolledMultiSelectInputProps } from 'components/input/MultiSelectInput';
import { Controller, UseControllerProps } from 'react-hook-form';

export type MultiSelectInputProps = Omit<
  UncontrolledMultiSelectInputProps,
  'onChange' | 'value'
> & {
  name: string;
  label?: string;
  control?: UseControllerProps['control'];
  value?: string[];
  defaultValue?: string[];
  messageErr?: string;
  onChange?: (value: string) => void;
};

const MultiSelectInput = (props: MultiSelectInputProps) => {
  const {
    name,
    label,
    control,
    value: valueProps,
    defaultValue,
    data,
    messageErr,
    width,
    required,
    onChange,
    ...restProps
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? `${label} is required!` : '',
      }}
      render={({ field: { onChange, value = valueProps }, fieldState: { error } }) => (
        <UncontrolledMultiSelectInput
          width={width}
          label={label}
          value={value ?? []}
          defaultValue={defaultValue}
          data={data}
          onChange={onChange}
          error={!!error}
          helperText={error?.message}
          {...restProps}
        />
      )}
    />
  );
};
export default MultiSelectInput;
