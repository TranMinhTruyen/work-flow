import { useCallback } from 'react';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { I18nEnum } from '../enums/I18nEnum';
import { isNullOrEmpty } from '../utils/stringUtil';
import { EMAIL_PATTERN } from '../constants/commonConst';

type UseCheckRequiredProps = {
  name: string;
  control: Control;
  required?: boolean;
  type?: string;
  i18n?: string;
};

const useInput = <T>(props: UseCheckRequiredProps) => {
  const { name, control, required, type, i18n } = props;
  const { t } = useTranslation(i18n);
  const { t: commonTranslate } = useTranslation(I18nEnum.COMMON_I18N);

  const checkDataInput = useCallback(
    (value: T) => {
      if (required) {
        if (Array.isArray(value) && value.length === 0) {
          control?.setError(name, { type: 'required', message: 'isRequired' });
          return;
        }
        if (typeof value === 'string' && isNullOrEmpty(value)) {
          control?.setError(name, { type: 'required', message: 'isRequired' });
          return;
        }
      }

      if (
        typeof value === 'string' &&
        type === 'email' &&
        !isNullOrEmpty(value) &&
        !EMAIL_PATTERN.test(value)
      ) {
        control.setError(name, { type: 'format', message: `format email error!` });
        return;
      }

      control?.setError(name, { type: 'valid' });
    },
    [control, name, required, type]
  );

  const translateLabel = useCallback(() => {
    return `${t(`label.${name}`)}`;
  }, [name, t]);

  const translateError = useCallback(
    (message: string) => {
      return `${t(`label.${name}`)} ${commonTranslate(message)}`;
    },
    [commonTranslate, name, t]
  );

  return {
    checkDataInput,
    translateLabel,
    translateError,
  };
};

export default useInput;
