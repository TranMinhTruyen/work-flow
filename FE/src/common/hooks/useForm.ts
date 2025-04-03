import {
  FieldValues,
  useForm as reactHookForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';

import { FormContext } from '../constants/typeConst';

const useForm = <
  TFieldValues extends FieldValues = FieldValues,
  TTransformedValues extends FieldValues = TFieldValues,
>(
  props?: UseFormProps<TFieldValues, FormContext, TTransformedValues>
): UseFormReturn<TFieldValues, FormContext, TTransformedValues> => {
  return reactHookForm(props);
};

export default useForm;
