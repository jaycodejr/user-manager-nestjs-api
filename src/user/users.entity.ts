import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserStatus } from '../enum/user-status.enum';
import { IsEnum } from 'class-validator';
import { Role } from '../role/role.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: false })
  fullname: string;

  @Column({ length: 100, nullable: false, unique: true })
  email: string;

  @Column({ length: 200, nullable: false })
  @Exclude()
  password: string;

  @Column({ default: UserStatus.ACTIVE })
  @IsEnum(UserStatus)
  status: UserStatus;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @Exclude()
  role: Role;
}
