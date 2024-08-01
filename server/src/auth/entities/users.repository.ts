import { Injectable, Logger } from "@nestjs/common";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AbstractRepository } from "src/common/database/repository/abstract.repository";

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
   protected readonly logger = new Logger(UsersRepository.name);

   constructor(
      @InjectRepository(User) usersRepository: Repository<User>,
   ) {
      super(usersRepository);
   }
}
