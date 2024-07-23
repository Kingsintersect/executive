import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
   constructor(
      private readonly userRepository: UserRepository,
   ) { }

   async createUser(firstName: string, lastName: string): Promise<User> {
      const mysqlUser = this.userRepository.create({ firstName, lastName })
      return mysqlUser
   }

   findAll(): Promise<User[]> {
      return this.userRepository.findAll();
   }
}
