import _ from 'lodash';

export const isNullOrEmpty = (value?: string | null) => {
  return _.isNil(value) || _.isEmpty(value);
};

export const capitalizeFirst = (value?: string): string => {
  if (isNullOrEmpty(value)) {
    return '';
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
};
