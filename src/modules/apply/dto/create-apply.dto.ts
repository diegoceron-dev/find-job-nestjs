import { ApiProperty } from "@nestjs/swagger"

export class CreateApplyDto {
    @ApiProperty()
    userId: number

    @ApiProperty()
    jobId: number
}
