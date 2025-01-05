import { useCallback, useState } from 'react';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { I18nEnum } from '../enums/I18nEnum';
import { formatString } from '../utils/stringUtil';

type UseCheckRequiredProps = {
  name: string;
  control: Control;
  required?: boolean;
  type?: string;
  i18n?: string;
  maxLength?: number;
};

const useInput = <T>(props: UseCheckRequiredProps) => {
  const { name, control, required, type, i18n, maxLength } = props;
  const { t } = useTranslation([i18n, I18nEnum.COMMON_I18N]);
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const emailSchema = z.string().email({ message: 'emailError' });
  const requireSchema = z.union([
    z.string().nonempty({ message: 'isRequired' }),
    z.array(z.any()).nonempty({ message: 'isRequired' }),
  ]);

  const checkDataInput = useCallback(
    (value: T) => {
      if (!isCheck) {
        return;
      }

      if (required) {
        try {
          requireSchema.parse(value);
        } catch (error) {
          if (error instanceof z.ZodError) {
            control?.setError(name, { type: 'invalid', message: error.issues[0].message });
            return;
          }
        }
      }

      if (type === 'email') {
        try {
          emailSchema.parse(value);
        } catch (error) {
          if (error instanceof z.ZodError) {
            control?.setError(name, { type: 'invalid', message: error.issues[0].message });
            return;
          }
        }
      }

      if (typeof value === 'string' && maxLength && value.length > maxLength) {
        control?.setError(name, { type: 'maxLength', message: 'maxLengthError' });
        return;
      }

      control?.setError(name, { type: 'valid' });
    },
    [control, emailSchema, isCheck, maxLength, name, requireSchema, required, type]
  );

  const translateLabel = useCallback(() => {
    return `${t(`label.${name}`)}`;
  }, [name, t]);

  const translateError = useCallback(
    (message: string, type?: string) => {
      if (type === 'maxLength') {
        return formatString(
          t(`${I18nEnum.COMMON_I18N}:validate.${message}`),
          t(`label.${name}`),
          maxLength?.toString() ?? ''
        );
      }
      return formatString(t(`${I18nEnum.COMMON_I18N}:validate.${message}`), t(`label.${name}`));
    },
    [maxLength, name, t]
  );

  return {
    setIsCheck,
    checkDataInput,
    translateLabel,
    translateError,
  };
};

export default useInput;
