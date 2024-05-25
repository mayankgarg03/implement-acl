import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RegisterModule } from './modules/register/register.module';
import { JwtModule } from '@nestjs/jwt';
import { AclModule } from './modules/acl/acl.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        port: config.get<number>('DB_PORT'),
        host: config.get('DB_HOST'),
        database: config.get('DB_NAME'),
        entities: ['dist/**/*.entity.{js,ts}'],
        synchronize: true,
      }),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '600s' },
    }),
    RegisterModule,
    AclModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
