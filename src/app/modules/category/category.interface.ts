// import { Types } from 'mongoose';

import { Types } from 'mongoose';

export type TCategory = {
  name: string;
  createdBy?: Types.ObjectId;
};
