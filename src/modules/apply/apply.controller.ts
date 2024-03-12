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
import { ApplyService } from './apply.service';
import { CreateApplyDto } from './dto/create-apply.dto';
import { UpdateApplyDto } from './dto/update-apply.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('apply')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() createApplyDto: CreateApplyDto) {
    const userId = req.user.userId;

    return this.applyService.create({
      userId: userId,
      jobId: createApplyDto.jobId,
    });
  }

  @Get()
  findAll() {
    return this.applyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplyDto: UpdateApplyDto) {
    return this.applyService.update(+id, updateApplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applyService.remove(+id);
  }
}
