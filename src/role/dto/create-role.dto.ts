import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Role name is required' })
  @IsString()
  name: string;
}
