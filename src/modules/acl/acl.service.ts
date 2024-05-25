import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class AclService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private entityManager: EntityManager,
  ) {}

  async findRole(role: string) {
    return await this.roleRepository.findOne({
      where: {
        rolename: role,
      },
    });
  }

  async findRoleById(id: number) {
    return await this.roleRepository.findOne({
      where: {
        id: id,
      },
      relations: ['permissions'],
    });
  }

  async findPermissionByRoleId(roleId: number) {
    const sqlQuery = `select * from role as role LEFT JOIN role_permission_assoc as assoc
    ON assoc.role_id=role.id LEFT JOIN permission as permission ON permission.id=assoc.permission_id where role.id=?`;
    return await this.entityManager.query(sqlQuery, [roleId]);
  }
}
