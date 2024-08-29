import { EMAIL_PATTERN } from 'common/constants/commonConst';
import { isNullOrEmpty } from 'common/utils/stringUtil';
import { ReactNode, useCallback } from 'react';
import { Control } from 'react-hook-form';

type UseCheckRequiredProps = {
  label?: string | ReactNode;
  name: string;
  control: Control;
  required?: boolean;
  type?: string;
};

const useCheckRequired = <T>(props: UseCheckRequiredProps) => {
  const { label, name, control, required, type } = props;

  const checkDataInput = useCallback(
    (value: T) => {
      if (required) {
        if (Array.isArray(value) && value.length === 0) {
          control?.setError(name, { type: 'required', message: `${label} is required!` });
          return;
        }
        if (typeof value === 'string' && isNullOrEmpty(value)) {
          control?.setError(name, { type: 'required', message: `${label} is required!` });
          return;
        }
      }

      if (
        typeof value === 'string' &&
        type === 'email' &&
        !isNullOrEmpty(value) &&
        !EMAIL_PATTERN.test(value)
      ) {
        control.setError(name, { type: 'format', message: `${label} format email error!` });
        return;
      }

      control?.setError(name, { type: 'valid' });
    },
    [control, label, name, required, type]
  );

  return {
    checkDataInput,
  };
};
export default useCheckRequired;
