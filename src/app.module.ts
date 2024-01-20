import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';

import { DatabaseConfigService } from './config/database.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    RoleModule,
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      expandVariables: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfigService,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
