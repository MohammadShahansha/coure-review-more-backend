/* eslint-disable no-undef */
import { Query } from 'mongoose';
import { TQueryObj } from '../interface/types';

const filter = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
  const queryObj = { ...query };
  const excludedFields = [
    'page',
    'searchTerm',
    'limit',
    'sort',
    'sortBy',
    'sortOrder',
    'fields',
  ];

  const tags = queryObj.tags;
  const level = queryObj.level;

  delete queryObj.tags;
  delete queryObj.level;

  excludedFields.forEach((keyword) => delete queryObj[keyword]);
  if (tags) {
    modelQuery = modelQuery.elemMatch('tags', { name: { $in: tags } });
  }

  if (level) {
    modelQuery = modelQuery.where('details.level').equals(level);
  }

  modelQuery = modelQuery.find(queryObj);
  return modelQuery;
};
export default filter;
