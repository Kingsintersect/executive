import { AbstractEntity } from 'src/common/database/repository/abstract.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Product extends AbstractEntity {
   @Column()
   title: string;

   @Column()
   description: string;

   @Column()
   price: number;
}