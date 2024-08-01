import { PartialType } from '@nestjs/mapped-types';
import { CreatePasswordResetDto } from './create-reset-password.dto';

export class UpdatePasswordResetDto extends PartialType(CreatePasswordResetDto) { }
