import { Entity, PrimaryGeneratedColumn, } from 'typeorm';
// import { Entity, ObjectIdColumn, } from 'typeorm';

@Entity()
export class AbstractEntity {
   @PrimaryGeneratedColumn()
   id?: number;

   // @ObjectIdColumn({ name: '_id', nullable: true })
   // _id?: string;
}

