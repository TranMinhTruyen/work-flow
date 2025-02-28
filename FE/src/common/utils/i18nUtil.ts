import { I18nEnum } from '../enums/i18nEnum';

export const translate = (key: string, type?: I18nEnum): string => {
  switch (type) {
    case I18nEnum.COMMON_I18N:
      return `${I18nEnum.COMMON_I18N}.${key}`;
    case I18nEnum.LOGIN_I18N:
      return `${I18nEnum.LOGIN_I18N}.${key}`;
    case I18nEnum.REGISTER_I18N:
      return `${I18nEnum.REGISTER_I18N}.${key}`;
    default:
      return '';
  }
};
