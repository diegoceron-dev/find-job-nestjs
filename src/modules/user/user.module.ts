import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.provider';
import { DatabaseModule } from '../../config/database.module';
import { userTypeProviders } from '../catalogs/user-type/user-type.provider';
import { UserTypeService } from '../catalogs/user-type/user-type.service';
import { companyProviders } from '../company/company.provider';
import { CompanyService } from '../company/company.service';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UserController],
  providers: [
    AuthService,
    JwtService,
    ...companyProviders,
    CompanyService,
    ...userTypeProviders,
    UserTypeService,
    ...userProviders,
    UserService
  ],
})
export class UserModule {}
