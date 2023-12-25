import { Query } from 'mongoose';
import { TQueryObj } from '../interface/types';

const field = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
  if (query.fields) {
    const fields = query.fields.split('.').join(' ');
    modelQuery.select(fields);
  }
  return modelQuery;
};
export default field;
