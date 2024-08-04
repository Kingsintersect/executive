import { User } from 'src/auth/entities/user.entity';
import { AbstractEntity } from 'src/common/database/repository/abstract.entity';
import { Entity, Column, OneToOne, JoinColumn, } from 'typeorm';

@Entity()
export class Profile extends AbstractEntity {
   @Column()
   firstName: string;

   @Column()
   lastName: string;

   // @Column()
   // userId: number;

   // optional
   @Column()
   middleName?: string;

   @Column({ nullable: true })
   pictureRef?: string;

   @Column({ type: 'text', nullable: true })
   bio?: string;

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

   // RELATIONSHIP
   @OneToOne(() => User, (user) => user.profile)
   @JoinColumn()
   user: number;

}
