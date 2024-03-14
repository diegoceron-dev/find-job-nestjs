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
  ForbiddenException,
} from '@nestjs/common';
import { ApplyService } from './apply.service';
import { CreateApplyDto } from './dto/create-apply.dto';
import { UpdateApplyDto } from './dto/update-apply.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from '../user/user.service';
import { UserTypes } from '../common/enums/userTypes.enum';

@Controller('apply')
export class ApplyController {
  constructor(
    private readonly applyService: ApplyService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req, @Body() createApplyDto: CreateApplyDto) {
    const userId = req.user.userId;

    const user = await this.userService.findOne(userId);

    if (user.userType.description !== UserTypes.WORKER)
      throw new ForbiddenException();

    return await this.applyService.create({
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
