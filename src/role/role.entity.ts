import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleStatus } from '../enum/role-status.enum';
import { IsEnum } from 'class-validator';
import { User } from '../user/users.entity';
//import { Exclude } from 'class-transformer';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false, unique: true })
  name: string;

  @Column({ default: RoleStatus.ACTIVE })
  @IsEnum(RoleStatus)
  status: RoleStatus;

  @OneToMany(() => User, (user) => user.role)
  //@Exclude({ toPlainOnly: true })
  users: User[];
}
