import { ApiProperty } from '@nestjs/swagger';

export class PagerDto {
  @ApiProperty()
  page: number;
  
  @ApiProperty()
  perPage: number;
}
