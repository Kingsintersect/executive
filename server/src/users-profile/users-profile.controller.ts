import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
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


  @Get('admin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  getAdminData(@Req() req: any) {
    return { superAdmin: req.user, message: "super admin roll accessed" };
  }

  @Get('manager')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MANAGER, UserRole.ADMIN)
  getManagerData() {
    return 'This route is allowed for managers';
  }

  @Get('editor')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.EDITOR, UserRole.MANAGER, UserRole.ADMIN)
  getEditorData() {
    return 'This route is allowed for editor';
  }

  @Get('guest')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.GUEST, UserRole.EDITOR, UserRole.MANAGER, UserRole.ADMIN)
  getUserData() {
    return 'This route is allowed for guests';
  }
}
