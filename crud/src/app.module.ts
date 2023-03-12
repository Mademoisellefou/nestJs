import { EmployeeModule } from './Employee/employee.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './Employee/employee.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import * as process from 'process'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    EmployeeModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.NESTJS_HOST,
      port: Number(process.env.NESTJS_PORT),
      username: process.env.NESTJS_USERNAME,
      password: process.env.NESTJS_PASSWORD,
      database: process.env.NESTJS_DATABASE,
      synchronize: true,
      entities: [process.env.NESTJS_ENTITIES],
    }),
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
