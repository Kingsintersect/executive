// src/common/mongo-base.repository.ts
import { Model } from 'mongoose';
import { Repository } from './repository.interface';
import { Document } from 'mongoose';

export abstract class MongoBaseRepository<T extends Document> implements Repository<T> {
  constructor(
    private readonly mongoModel: Model<T>,
  ) { }

  findAll(): Promise<T[]> {
    return this.mongoModel.find().exec();
  }

  findById(id: number): Promise<T> {
    return this.mongoModel.findById(id).exec();
  }

  create(entity: T): Promise<T> {
    const newEntity = new this.mongoModel(entity);
    return newEntity.save();
  }

  async update(id: number, entity: T): Promise<T> {
    return this.mongoModel.findByIdAndUpdate(id, entity as any, { new: true }).exec();
  }

  async delete(id: number): Promise<void> {
    await this.mongoModel.findByIdAndDelete(id).exec();
  }
}
