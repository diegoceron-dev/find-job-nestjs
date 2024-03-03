import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.provider';
import { DatabaseModule } from '../../config/database.module';

@Module({
  imports: [DatabaseModule],  
  controllers: [UserController],
  providers: [...userProviders, UserService],
})
export class UserModule {}