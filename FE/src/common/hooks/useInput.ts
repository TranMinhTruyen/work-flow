import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { I18nEnum } from '../enums/i18nEnum';
import { formatString } from '../utils/stringUtil';
import { UseInputProps } from './types/useInputTypes';

const useInput = <T>(props: UseInputProps) => {
  const { name, control, required, type, minLength, maxLength } = props;
  const { t } = useTranslation([
    control._options.context?.language ?? I18nEnum.COMMON_I18N,
    I18nEnum.COMMON_I18N,
  ]);
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const checkDataInput = useCallback(
    (value: T) => {
      if (!isCheck) {
        return;
      }

      if (required) {
        const requireSchema = z.union([
          z.string().nonempty({ message: 'isRequired' }),
          z.array(z.any()).nonempty({ message: 'isRequired' }),
        ]);

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
        const emailSchema = z.string().email({ message: 'emailError' });

        try {
          emailSchema.parse(value);
        } catch (error) {
          if (error instanceof z.ZodError) {
            control?.setError(name, { type: 'invalid', message: error.issues[0].message });
            return;
          }
        }
      }

      if (typeof value === 'string' && maxLength) {
        if (maxLength && !minLength) {
          const maxLenghtSchema = z.string().max(maxLength ?? 5000, { message: 'maxLengthError' });

          try {
            maxLenghtSchema.parse(value);
          } catch (error) {
            if (error instanceof z.ZodError) {
              control?.setError(name, { type: 'maxLength', message: error.issues[0].message });
              return;
            }
          }
        } else if (!maxLength && minLength) {
          const minLenghtSchema = z.string().min(minLength ?? 0, { message: 'minLengthError' });

          try {
            minLenghtSchema.parse(value);
          } catch (error) {
            if (error instanceof z.ZodError) {
              control?.setError(name, { type: 'maxLength', message: error.issues[0].message });
              return;
            }
          }
        } else {
          const minMaxLenghtSchema = z
            .string()
            .min(minLength ?? 0, { message: 'minLengthError' })
            .max(maxLength ?? 5000);
        }
      }

      control?.setError(name, { type: 'valid' });
    },
    [control, isCheck, maxLength, minLength, name, required, type]
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
