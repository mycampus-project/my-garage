import { Types } from 'mongoose';

import Type, { TypeDocument } from '../models/Type';

function createType(type: TypeDocument): Promise<TypeDocument> {
  return type.save();
}

function findTypeById(typeId: string): Promise<TypeDocument> {
  return Type.findById(typeId)
    .exec()
    .then((type) => {
      if (!type) {
        throw new Error(`Type ${typeId} not found`);
      }
      return type;
    });
}

function findAllTypes(): Promise<TypeDocument[]> {
  return Type.find().exec();
}

function updateType(typeId: string, update: Partial<TypeDocument>): Promise<TypeDocument> {
  return Type.findByIdAndUpdate(typeId, update, { new: true })
    .exec()
    .then((type) => {
      if (!type) {
        throw new Error(`Type ${typeId} not found`);
      }
      return type;
    });
}

function deleteType(
  typeId: string,
  removedBy: Types.ObjectId,
  removedAt: Date,
): Promise<TypeDocument> {
  const update: Partial<TypeDocument> = { removedAt, removedBy };
  return Type.findByIdAndUpdate(typeId, update, { new: true })
    .exec()
    .then((type) => {
      if (!type) {
        throw new Error(`Type ${typeId} not found`);
      }
      return type;
    });
}

export default {
  createType,
  findTypeById,
  findAllTypes,
  updateType,
  deleteType,
};
