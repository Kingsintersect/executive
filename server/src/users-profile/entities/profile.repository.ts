import { Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AbstractRepository } from "src/common/database/repository/abstract.repository";
import { Profile } from "./users-profile.entity";

@Injectable()
export class ProfileRepository extends AbstractRepository<Profile> {
   protected readonly logger = new Logger(ProfileRepository.name);

   constructor(
      @InjectRepository(Profile) usersRepository: Repository<Profile>,
   ) {
      super(usersRepository);
   }
}
