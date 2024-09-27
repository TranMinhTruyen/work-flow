import { EMAIL_PATTERN } from 'common/constants/commonConst';
import { I18nEnum } from 'common/enums/i18nEnum';
import { translate } from 'common/utils/i18nUtil';
import { isNullOrEmpty } from 'common/utils/stringUtil';
import { useCallback } from 'react';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type UseCheckRequiredProps = {
  label?: string;
  name: string;
  control: Control;
  required?: boolean;
  type?: string;
  i18n: I18nEnum;
};

const useInput = <T>(props: UseCheckRequiredProps) => {
  const { name, control, required, type, i18n } = props;
  const { t } = useTranslation();

  const checkDataInput = useCallback(
    (value: T) => {
      if (required) {
        if (Array.isArray(value) && value.length === 0) {
          control?.setError(name, { type: 'required', message: `is required!` });
          return;
        }
        if (typeof value === 'string' && isNullOrEmpty(value)) {
          control?.setError(name, { type: 'required', message: `is required!` });
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
    return `${t(translate(`label.${name}`, i18n))}`;
  }, [i18n, name, t]);

  const translateError = useCallback(
    (message: string) => {
      return `${t(translate(`label.${name}`, i18n))} ${message}`;
    },
    [i18n, name, t]
  );

  return {
    checkDataInput,
    translateLabel,
    translateError,
  };
};

export default useInput;
