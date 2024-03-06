import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobBenefitsService } from './job-benefits.service';
import { CreateJobBenefitDto } from './dto/create-job-benefit.dto';
import { UpdateJobBenefitDto } from './dto/update-job-benefit.dto';

@Controller('job-benefits')
export class JobBenefitsController {
  constructor(private readonly jobBenefitsService: JobBenefitsService) {}

  @Post()
  create(@Body() createJobBenefitDto: CreateJobBenefitDto) {
    return this.jobBenefitsService.create(createJobBenefitDto);
  }

  @Get()
  findAll() {
    return this.jobBenefitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobBenefitsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobBenefitDto: UpdateJobBenefitDto) {
    return this.jobBenefitsService.update(+id, updateJobBenefitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobBenefitsService.remove(+id);
  }
}
