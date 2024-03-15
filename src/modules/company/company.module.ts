import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { DatabaseModule } from '../../config/database.module';
import { companyProviders } from './company.provider';
import { userTypeProviders } from '../catalogs/user-type/user-type.provider';
import { UserTypeService } from '../catalogs/user-type/user-type.service';
import { userProviders } from '../user/user.provider';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [CompanyController],
  providers: [
    AuthService,
    JwtService,
    ...companyProviders,
    CompanyService,
    ...userTypeProviders,
    UserTypeService,
    ...userProviders,
    UserService,
  ],
})
export class CompanyModule {}
