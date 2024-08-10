import Checkbox, { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';
import { FormControlLabel, FormGroup } from '@mui/material';

export type CheckBoxProps = MuiCheckboxProps & {
  label?: string;
  error?: boolean;
};

const CheckBox = (props: CheckBoxProps) => {
  const { label, ...restProps } = props;

  if (!label) {
    return <Checkbox {...restProps} />;
  }

  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox {...restProps} />} label={label || ''} />
    </FormGroup>
  );
};

export default CheckBox;
