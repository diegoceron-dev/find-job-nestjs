import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDto extends PartialType(CreateJobDto) {
    @ApiProperty()
    id: number

    @ApiProperty()
    title: string
    
    @ApiProperty()
    description: string

    @ApiProperty()
    monthlySalary: number

    @ApiProperty()
    exchange: number

    @ApiProperty()
    benefits: number[]
}
