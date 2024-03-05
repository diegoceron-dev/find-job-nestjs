import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database.module';
import { userTypeProviders } from './user-type.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...userTypeProviders],
})
export class UserTypeModule {}
