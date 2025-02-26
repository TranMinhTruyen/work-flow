import { capitalizeFirst } from '@/common/utils/stringUtil';
import { FormControlLabel, FormGroup } from '@mui/material';
import Checkbox, { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';

export type CheckBoxProps = MuiCheckboxProps & {
  label?: string;
};

const CheckBoxInput = (props: CheckBoxProps) => {
  const { id, label, className, ...restProps } = props;

  if (!label) {
    return <Checkbox id={`checkBox${capitalizeFirst(id)}`} className={className} {...restProps} />;
  }

  return (
    <FormGroup id={`checkBoxFormGroup${capitalizeFirst(id)}`} className={className}>
      <FormControlLabel
        id={`checkBoxLabel${capitalizeFirst(id)}`}
        control={<Checkbox id={`checkBox${capitalizeFirst(id)}`} {...restProps} />}
        label={label ?? ''}
      />
    </FormGroup>
  );
};

export default CheckBoxInput;
