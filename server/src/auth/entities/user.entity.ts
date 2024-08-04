import { Min } from 'class-validator';
import { AbstractEntity } from 'src/common/database/repository/abstract.entity';
import { Entity, Column, OneToOne, JoinColumn, } from 'typeorm';
import { UserRole } from '../../shared/types/generic.types';
import { Profile } from 'src/users-profile/entities/users-profile.entity';

@Entity()
export class User extends AbstractEntity {
   @Column()
   email: string;

   @Column({ unique: true })
   username: string;

   @Column()
   @Min(6)
   password: string;

   // optional
   @Column({
      type: "enum",
      enum: UserRole,
      default: UserRole.USER,
   })
   userRole?: string;

   @Column({ default: 1 })
   accessLevel?: number;

   @Column({ default: true })
   isActive?: boolean;

   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
   createdAt: Date;

   @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
   @JoinColumn()
   profile?: number;



   // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
   // updatedAt: Date;

   // @CreateDateColumn({ type: 'timestamp' })
   // createdAt?: Date;

   // constructor() {
   //    super();
   //    if (!this.createdAt) {
   //       this.createdAt = new Date();
   //    }
   // }
}
