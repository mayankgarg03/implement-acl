import { Module } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AclController } from './controllers/acl.controller';
import { AclService } from './acl.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  exports: [AclService],
  controllers: [AclController],
  providers: [AclService],
})
export class AclModule {}
