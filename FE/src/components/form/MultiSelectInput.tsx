import UncontrolledMultiSelectInput from 'components/input/MultiSelectInput';
import { MultiSelectInputProps as UncontrolledMultiSelectInputProps } from 'components/input/MultiSelectInput';
import { Controller, UseControllerProps } from 'react-hook-form';

export type MultiSelectInputProps = UncontrolledMultiSelectInputProps & {
  name: string;
  control?: UseControllerProps['control'];
  defaultValue?: string | number | boolean;
  messageErr?: string;
  onChange?: (value: string) => void;
};

const MultiSelectInput = (props: MultiSelectInputProps) => {
  const {
    name,
    control,
    defaultValue,
    data,
    messageErr,
    label,
    width,
    required,
    onChange,
    ...restProps
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required: required,
      }}
      render={({ field: { onChange, value = '' }, fieldState: { error } }) => (
        <UncontrolledMultiSelectInput
          width={width}
          label={label}
          value={value || ''}
          data={data}
          defaultValue={defaultValue}
          onChange={onChange}
          error={!!(error && error.type !== 'valid')}
          {...restProps}
        />
      )}
    />
  );
};
export default MultiSelectInput;
