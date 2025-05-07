import i18next from 'i18next';
import _ from 'lodash';

/**
 * Check string is null or empty.
 * If string is null or empty return true.
 *
 * @param value
 * @returns
 */
export const isNullOrEmpty = (value?: string | null) => {
  return _.isNil(value) || _.isEmpty(value);
};

/**
 *
 * @param value
 * @returns
 */
export const capitalizeFirst = (value?: string): string => {
  if (isNullOrEmpty(value)) {
    return '';
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
};

/**
 * Format string with params.
 *
 * @param template
 * @param params
 * @returns
 */
export const formatString = (template: string, ...args: (string | number)[]): string => {
  return template.replace(/{(\d+)}/g, (match, index) => {
    const paramIndex = parseInt(index, 10);
    return args[paramIndex] !== undefined ? args[paramIndex].toString() : match;
  });
};

/**
 * Get message translate.
 *
 * @param messageCode
 * @param args
 * @returns
 */
export const getMessage = (messageCode: string, ...args: (string | number)[]) => {
  const message = i18next.t(`message:${messageCode}`);
  return formatString(message, ...args);
};

/**
 * Generate random number.
 *
 * @param pad
 * @returns
 */
export const randomNumberString = (pad?: number): string => {
  const randomNum = Math.floor(Math.random() * 1000000);
  return randomNum.toString().padStart(pad ?? 6, '0');
};
