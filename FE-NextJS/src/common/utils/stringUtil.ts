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
 *
 * @param template
 * @param params
 * @returns
 */
export const formatString = (template: string, ...params: (string | number)[]): string => {
  return template.replace(/{(\d+)}/g, (match, index) => {
    const paramIndex = parseInt(index, 10);
    return params[paramIndex] !== undefined ? params[paramIndex].toString() : match;
  });
};
