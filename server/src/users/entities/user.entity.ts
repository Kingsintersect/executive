import { AbstractEntity } from 'src/common/database/mysql/abstract.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends AbstractEntity {
   @Column()
   firstName: string;

   @Column()
   lastName: string;

   @Column({ default: true })
   isActive?: boolean;
}
