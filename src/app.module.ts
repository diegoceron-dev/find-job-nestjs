import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { JobModule } from './modules/job/job.module';
import { ResumeModule } from './modules/resume/resume.module';
import { ApplyModule } from './modules/apply/apply.module';
import { CompanyModule } from './modules/company/company.module';

@Module({
  imports: [
    UserModule,
    JobModule,
    ResumeModule,
    ApplyModule,
    CompanyModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
