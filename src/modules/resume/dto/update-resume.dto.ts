import { PartialType } from '@nestjs/mapped-types';
import { CreateResumeDto } from './create-resume.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateResumeDto extends PartialType(CreateResumeDto) {
    @ApiProperty()
    id: number

    @ApiProperty()
    file: string
}
