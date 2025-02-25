import { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'UserRegistration',
    },
  },
  {
    timestamps: true,
  },
);

export const Category = model<TCategory>('Categorie', categorySchema);
