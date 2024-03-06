import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/config/database.module';
import { userProviders } from '../user/user.provider';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { companyProviders } from '../company/company.provider';
import { userTypeProviders } from '../catalogs/user-type/user-type.provider';
import { CompanyService } from '../company/company.service';
import { UserTypeService } from '../catalogs/user-type/user-type.service';

@Module({
  imports: [DatabaseModule, JwtModule.register({})],
  providers: [AuthService,
    ...companyProviders, CompanyService, 
    ...userTypeProviders, UserTypeService,
    ...userProviders,UserService
  ],
  controllers: [AuthController],
})
export class AuthModule {}
