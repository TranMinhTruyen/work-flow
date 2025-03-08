import { Control } from 'react-hook-form';

import { FormContext } from '@/common/constants/typeConst';

export type UseInputProps = {
  name: string;
  control: Control<any, FormContext>;
  required?: boolean;
  type?: string;
  minLength?: number;
  maxLength?: number;
};
