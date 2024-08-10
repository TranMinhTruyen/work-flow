import _ from 'lodash';

export const isNullOrEmpry = (value?: string | null) => {
  return _.isUndefined(value) || _.isNull(value) || _.isEmpty(value);
};
