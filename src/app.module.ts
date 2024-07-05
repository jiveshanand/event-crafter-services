import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { APP_FILTER } from '@nestjs/core';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { WinstonLoggerService } from './common/logging/winston-logger-service';
import { UsersModule } from './users/users.module';
import { Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './common/exceptions/all-exceptions.filter';

// import { ProfileService } from './profile/profile.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    WinstonLoggerService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AppService,
  ],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor() {
    this.logger.log('AppModule initialized');
  }
}

// import { Controller, Get } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { ApiTags } from '@nestjs/swagger';

// @Controller('users')
// @ApiTags('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Get()
//   findAll() {
//     return this.usersService.findAll();
//   }
// }
