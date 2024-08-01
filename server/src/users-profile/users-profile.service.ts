import { Injectable } from '@nestjs/common';
import { CreateUsersProfileDto } from './dto/create-users-profile.dto';
import { UpdateUsersProfileDto } from './dto/update-users-profile.dto';
import { ProfileRepository } from './entities/profile.repository';

@Injectable()
export class UsersProfileService {
  constructor(private readonly profileRepository: ProfileRepository) { }

  create(createUsersProfileDto: CreateUsersProfileDto) {
    return 'This action adds a new usersProfile';
  }

  findAll() {
    return `This action returns all usersProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersProfile`;
  }

  update(id: number, updateUserDto: UpdateUsersProfileDto) {
    return this.profileRepository.update({ id }, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} usersProfile`;
  }

  // UTILITY METHODS
  async UserExists(userId: number) {
    const user = await this.profileRepository.confirmExists({
      where: { userId },
    });
    return user || null;
  }
}
