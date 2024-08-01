import { AbstractEntity } from 'src/common/database/repository/abstract.entity';
import { Entity, Column, } from 'typeorm';

@Entity()
export class UsersProfile extends AbstractEntity {
   @Column()
   firstName: string;

   @Column()
   lastName: string;

   @Column()
   userId: number;

   @Column()
   middleName?: string;

   @Column({ nullable: true })
   pictureRef?: string;

   @Column({ type: 'text', nullable: true })
   bio?: string;

   // optional
   @Column({ nullable: true })
   contry?: string;

   @Column({ nullable: true })
   state?: string;

   @Column({ nullable: true })
   phonNumber?: number;

   @Column({ nullable: true })
   address?: string;

   @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
   updatedAt?: Date;

}
