import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProfileService } from './users-profile.service';
import { CreateProfileDto } from './dto/create-users-profile.dto';
import { UpdateProfileDto } from './dto/update-users-profile.dto';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRole } from 'src/shared/types/generic.types';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@Controller('profile')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(
  UserRole.GUEST,
  UserRole.EDITOR,
  UserRole.MANAGER,
  UserRole.ADMIN,
  UserRole.USER
)
export class ProfileController {
  constructor(private readonly usersProfileService: ProfileService) { }

  @Post("create")
  create(@Req() req: any, @Body() createUsersProfileDto: CreateProfileDto) {
    return this.usersProfileService.create(req.user.id, createUsersProfileDto);
  }
  // @Get('admin')
  // // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  // getAdminData(@Req() req: any) {
  //   return { superAdmin: req.user, message: "super admin roll accessed" };
  // }

  @Get()
  find(@Req() req: any) {
    return this.usersProfileService.getProfile(req.user.id);
  }

  @Get('all')
  findOne() {
    return this.usersProfileService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersProfileDto: UpdateProfileDto) {
    return this.usersProfileService.update(+id, updateUsersProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersProfileService.remove(+id);
  }






  // @Get('manager')
  // // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.MANAGER, UserRole.ADMIN)
  // getManagerData() {
  //   return 'This route is allowed for managers';
  // }

  // @Get('editor')
  // // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.EDITOR, UserRole.MANAGER, UserRole.ADMIN)
  // getEditorData() {
  //   return 'This route is allowed for editor';
  // }

  // @Get('guest')
  // // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.GUEST, UserRole.EDITOR, UserRole.MANAGER, UserRole.ADMIN)
  // getUserData() {
  //   return 'This route is allowed for guests';
  // }
}
