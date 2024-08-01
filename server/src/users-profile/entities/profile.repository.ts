import { Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AbstractRepository } from "src/common/database/repository/abstract.repository";
import { UsersProfile } from "./users-profile.entity";

@Injectable()
export class ProfileRepository extends AbstractRepository<UsersProfile> {
   protected readonly logger = new Logger(ProfileRepository.name);

   constructor(
      @InjectRepository(UsersProfile) usersRepository: Repository<UsersProfile>,
   ) {
      super(usersRepository);
   }
}
