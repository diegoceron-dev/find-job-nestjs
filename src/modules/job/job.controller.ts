import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { AuthGuard } from '../auth/auth.guard';
import { GetJob } from './dto/get-job.dto';
import { UserService } from '../user/user.service';
import { CompanyService } from '../company/company.service';

@Controller('job')
export class JobController {
  constructor(
    private readonly jobService: JobService,
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createJobDto: CreateJobDto, @Request() req) {
    const userId = req.user.id;
    return this.jobService.create(userId, createJobDto);
  }

  @UseGuards(AuthGuard)
  @Get('/my-jobs')
  async findAllMyJobs(@Request() req, @Body() getJobDto: GetJob) {
    const userId = req.user.userId;

    const companyId = await this.companyService.findOne(null, userId);

    console.clear()

    console.log(userId, companyId.id)

    return await this.jobService.findAll({
      userId: userId,
      companyId: companyId.id,
      categoryId: null,
    });
  }

  @Get()
  findAll(@Body() getJobDto: GetJob) {
    return this.jobService.findAll({
      categoryId: null,
      userId: null,
      companyId: null,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobService.remove(+id);
  }
}
