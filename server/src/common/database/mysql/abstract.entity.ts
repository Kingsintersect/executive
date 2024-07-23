import { Entity, PrimaryGeneratedColumn, } from 'typeorm';

@Entity()
export class AbstractEntity {
   @PrimaryGeneratedColumn()
   id?: number;

   // @ObjectIdColumn({ name: '_id', nullable: true }) // MongoDB ObjectId, nullable for MySQL compatibility
   // _id?: string;
}