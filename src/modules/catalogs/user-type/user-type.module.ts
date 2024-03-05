import { Module } from '@nestjs/common';
import { UserTypeService } from './user-type.service';
import { UserTypeController } from './user-type.controller';
import { DatabaseModule } from 'src/config/database.module';
import { userTypeProviders } from './user-type.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UserTypeController],
  providers: [...userTypeProviders, UserTypeService],
})
export class UserTypeModule {}
