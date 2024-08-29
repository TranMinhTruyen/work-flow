import _ from 'lodash';

export const isNullOrEmpty = (value?: string | null) => {
  return _.isNil(value) || _.isEmpty(value);
};
