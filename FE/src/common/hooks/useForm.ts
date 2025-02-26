import {
  FieldValues,
  useForm as reactHookForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';
import { FormContext } from '../constants/typeConst';

const useForm = <
  TFieldValues extends FieldValues = FieldValues,
  TTransformedValues extends FieldValues | undefined = undefined,
>(
  props?: UseFormProps<TFieldValues, FormContext>
): UseFormReturn<TFieldValues, FormContext, TTransformedValues> => {
  return reactHookForm(props);
};

export default useForm;
