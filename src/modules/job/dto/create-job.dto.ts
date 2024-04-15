import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  monthlySalary: number;

  @ApiProperty()
  exchange: number;

  @ApiProperty()
  benefits: number[];

  @ApiProperty()
  responsibilities: string;

  @ApiProperty()
  requirements: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  companyId: number;
}
