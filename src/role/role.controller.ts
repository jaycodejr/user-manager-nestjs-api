import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('role')
@UseGuards(AuthGuard())
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getRoles(): Promise<Role[]> {
    return this.roleService.getRoles();
  }

  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.createRole(createRoleDto);
  }
}
