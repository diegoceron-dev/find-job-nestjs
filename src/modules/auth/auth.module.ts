import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/config/database.module';
import { UserService } from '../user/user.service';
import { userProviders } from '../user/user.provider';
import { JwtModule } from '@nestjs/jwt';
import { CompanyService } from '../company/company.service';
import { UserTypeService } from '../catalogs/user-type/user-type.service';
import { companyProviders } from '../company/company.provider';
import { userTypeProviders } from '../catalogs/user-type/user-type.provider';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
    exports: [AuthService],
  providers: [
    AuthService,
    ...companyProviders,
    CompanyService,
    ...userTypeProviders,
    UserTypeService,
    ...userProviders,
    UserService,
  ]
})
export class AuthModule {}
