import _ from 'lodash';
import { DateType } from './dateUtil';

export const isNullOrEmpry = (value?: string | null ) => {
  return _.isNil(value) || _.isEmpty(value);
};
