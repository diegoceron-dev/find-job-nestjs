import { ApiProperty } from '@nestjs/swagger';

export class CreateApplyDto {
  @ApiProperty()
  jobId: number;
}
