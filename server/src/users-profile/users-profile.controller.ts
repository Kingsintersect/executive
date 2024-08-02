import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersProfileService } from './users-profile.service';
import { CreateUsersProfileDto } from './dto/create-users-profile.dto';
import { UpdateUsersProfileDto } from './dto/update-users-profile.dto';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRole } from 'src/shared/types/generic.types';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@Controller('users-profile')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersProfileController {
  constructor(private readonly usersProfileService: UsersProfileService) { }

  @Post("create")
  @Roles(UserRole.GUEST, UserRole.EDITOR, UserRole.MANAGER, UserRole.ADMIN)
  create(@Body() createUsersProfileDto: CreateUsersProfileDto) {
    return this.usersProfileService.create(createUsersProfileDto);
  }

  @Get()
  findAll() {
    return this.usersProfileService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersProfileService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersProfileDto: UpdateUsersProfileDto) {
    return this.usersProfileService.update(+id, updateUsersProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersProfileService.remove(+id);
  }
}
