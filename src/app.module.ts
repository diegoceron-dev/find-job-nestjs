import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';
import { ResumeModule } from './resume/resume.module';
import { ApplyModule } from './apply/apply.module';
import { CompanyModule } from './company/company.module';

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
