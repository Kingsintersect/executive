import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-users-profile.dto';
import { UpdateProfileDto } from './dto/update-users-profile.dto';
import { ProfileRepository } from './entities/profile.repository';
import { AuthService } from 'src/auth/auth.service';
import { UsersRepository } from 'src/auth/entities/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ProfileService {
	constructor(
		private readonly profileRepository: ProfileRepository,
		private readonly authService: AuthService,
		@InjectRepository(User) private readonly userRepository: UsersRepository,
	) { }

	async create(id: number, createProfileDto: CreateProfileDto) {
		try {
			const profile = await this.profileRepository.confirmExists({ where: { user: id } })
			if (profile) {
				return this.profileRepository.update({ id: profile.id }, createProfileDto);
			}

			const savedProfile = await this.profileRepository.create({ ...createProfileDto, user: id });
			await this.userRepository.update({ id }, { profile: savedProfile.id });

			return savedProfile;
		} catch (error) {
			throw new BadRequestException(error);
		}
	}

	getProfile(id: number) {
		try {
			return this.profileRepository.findOne({ where: { id } });
		} catch (error) {
			throw new NotFoundException(error);
		}
	}

	async findAll() {
		return await this.profileRepository.findAll(
			{ firstName: true, lastName: true },
			null,
			{ firstName: "chijioke" }
		);
	}

	update(id: number, updateUserDto: UpdateProfileDto) {
		return this.profileRepository.update({ id }, updateUserDto);
	}

	remove(id: number) {
		return `This action removes a #${id} usersProfile`;
	}

	// UTILITY METHODS
	async UserExists(id: number) {
		const user = await this.profileRepository.confirmExists({
			where: { id },
		});
		return user || null;
	}
}
