import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "src/common/database/mysql/abstract.repository";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserRepository extends AbstractRepository<User> {
    protected readonly logger = new Logger(UserRepository.name);

    constructor(
        @InjectRepository(User) userRepository: Repository<User>,
    ) {
        super(userRepository);
    }
}
