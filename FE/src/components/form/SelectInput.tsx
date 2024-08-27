import UncontrolledSelectInput, {
  SelectInputProps as UncontrolledSelectInputProps,
} from 'components/input/SelectInput';
import { Controller, UseControllerProps } from 'react-hook-form';

export type SelectInputProps = UncontrolledSelectInputProps & {
  name: string;
  control?: UseControllerProps['control'];
  value?: string;
  required?: boolean;
  helperText?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
};

const SelectInput = (props: SelectInputProps) => {
  const {
    width,
    label,
    name,
    control,
    required,
    value: valueProps,
    data,
    defaultValue,
    placeholder,
    displayNone,
    onChange: onChangeProps,
    ...restProps
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? `${label} is required!` : '',
      }}
      render={({ field: { value = valueProps, onChange }, fieldState: { error } }) => (
        <UncontrolledSelectInput
          width={width}
          label={label}
          data={data}
          value={value ?? ''}
          onChange={onChange}
          error={!!(error && error.type !== 'valid')}
          helperText={!!error ? error.message : null}
          {...restProps}
        />
      )}
    />
  );
};

export default SelectInput;
