import { Role } from 'src/modules/acl/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username', unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  roleId: number;

  @OneToOne((type) => Role, (role) => role)
  @JoinColumn()
  role: Role;
}
