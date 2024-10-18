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

export const capitalizeFirst = (value?: string): string => {
  if (isNullOrEmpty(value)) {
    return '';
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
};
