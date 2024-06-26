import { PartialType } from '@nestjs/mapped-types';
import { CreateApplyDto } from './create-apply.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateApplyDto extends PartialType(CreateApplyDto) {
    @ApiProperty()
    id: number

    @ApiProperty()
    userId: number

    @ApiProperty()
    jobId: number
}
