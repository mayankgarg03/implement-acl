import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'rolename' })
  rolename: string;

  @ManyToMany((type) => Permission, (permission) => permission.roles)
  @JoinTable()
  permissions: Permission[];
}
