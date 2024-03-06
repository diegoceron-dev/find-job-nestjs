import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { DatabaseModule } from 'src/config/database.module';
import { resumeProviders } from './resume.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ResumeController],
  providers: [...resumeProviders, ResumeService],
})
export class ResumeModule {}
