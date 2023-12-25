import { Query } from 'mongoose';
import { TQueryObj } from '../interface/types';

const sort = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
  console.log(query);
  if (query.sortBy && query.sortOrder) {
    const sortBy = query.sortBy;
    const sortOrder = query.sortOrder;
    const sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
    modelQuery.sort(sortStr);
  }
  return modelQuery;
};
export default sort;
