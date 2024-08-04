import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-users-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) { }
