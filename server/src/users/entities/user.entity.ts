import { AbstractEntity } from 'src/common/database/repository/abstract.entity';
// import { MongoEntity } from 'src/common/database/repository/mongo.entity';
import { Entity, Column } from 'typeorm';

// const dbType = global['dbType'];
// const BaseEntity = (dbType === 'mongodb') ? MongoEntity : AbstractEntity;
// console.log(dbType, BaseEntity, process.env.DB_TYPE)

@Entity()
export class User extends AbstractEntity {
   @Column()
   firstName: string;

   @Column()
   lastName: string;

   @Column({ default: true })
   isActive?: boolean;
}
