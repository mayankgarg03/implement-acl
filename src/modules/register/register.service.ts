import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../acl/entities/role.entity';
import { AclService } from '../acl/acl.service';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private aclService: AclService,
    private jwtService: JwtService,
  ) {}

  toUserEntity(user: RegisterDTO, role: Role) {
    const newUser = new User();
    newUser.username = user.username;
    newUser.password = user.password;
    newUser.role = role;
    newUser.roleId = role.id;
    return newUser;
  }

  async createUser(user: RegisterDTO) {
    try {
      const role: any = await this.aclService.findRole(user.role);

      if (!role) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }
      const userEntity: User = this.toUserEntity(user, role);
      const createdUser = this.userRepository.create(userEntity);
      this.userRepository.save(createdUser);
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  async loginUser(user: LoginDTO): Promise<any> {
    try {
      const { username, password } = user;
      const userExist: User = await this.userRepository.findOne({
        where: {
          username: username,
          password: password,
        },
      });

      if (!userExist) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const role: any = await this.aclService.findRoleById(userExist.roleId);
      if (!role) {
        throw new HttpException('User Role not found', HttpStatus.NOT_FOUND);
      }
      const permission: any = await this.aclService.findPermissionByRoleId(
        userExist.roleId,
      );
      if (userExist) {
        const payload = {
          sub: userExist.id,
          username: userExist.username,
          role: role.rolename,
        };
        const token = await this.jwtService.signAsync(payload);
        return { ...userExist, token, role, permission };
      }

      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw error;
    }
  }
}
