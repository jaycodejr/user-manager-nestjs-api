import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleStatus } from '../enum/role-status.enum';

@Injectable()
export class RoleService {
  constructor(private roleRepo: RoleRepository) {}

  async getRoles(): Promise<Role[]> {
    return await this.roleRepo.find();
  }

  async getRoleById(id: string): Promise<Role> {
    const found = await this.roleRepo.findOne({ where: { id } });
    if (found) {
      return found;
    }
    throw new NotFoundException(`Role with ID='${id} does not exist'`);
  }

  async getRoleByName(name: string): Promise<Role> {
    const found = this.roleRepo.findOne({ where: { name } });
    if (found) {
      return found;
    }
    throw new NotFoundException(`Role with name='${name} does not exist'`);
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name } = createRoleDto;
    try {
      const role = this.roleRepo.create({ name, status: RoleStatus.ACTIVE });

      await this.roleRepo.save(role);

      return role;
    } catch (error) {
      if (error.number === 2627) {
        throw new ConflictException(`Role name '${name}' already exist`);
      } else {
        throw new InternalServerErrorException(`Failed to create role`);
      }
    }
  }
}
