import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch, { SwitchProps } from '@mui/material/Switch';

import { capitalizeFirst } from '@/common/utils/stringUtil';

export type SwitchInputProps = SwitchProps & {
  label?: string;
};

const SwitchInput = (props: SwitchInputProps) => {
  const { id, label, className, ...restProps } = props;

  if (!label) {
    return <Switch id={`switch${capitalizeFirst(id)}`} className={className} {...restProps} />;
  }

  return (
    <FormGroup id={`switchFormGroup${capitalizeFirst(id)}`} className={className}>
      <FormControlLabel
        id={`switchLabel${capitalizeFirst(id)}`}
        control={<Switch id={`switch${capitalizeFirst(id)}`} {...restProps} />}
        label={label ?? ''}
      />
    </FormGroup>
  );
};
export default SwitchInput;
