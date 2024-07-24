import { ObjectIdColumn } from 'typeorm';
// import { AbstractEntity } from './abstract.entity';

export abstract class MongoEntity {
   @ObjectIdColumn({ name: '_id', nullable: true })
   _id?: string;
}
