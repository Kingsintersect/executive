import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersProfileDto } from './create-users-profile.dto';

export class UpdateUsersProfileDto extends PartialType(CreateUsersProfileDto) { }
