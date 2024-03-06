import { ApiProperty } from "@nestjs/swagger"

export class CreateApplyDto {
    @ApiProperty()
    userId: string

    @ApiProperty()
    jobId: string
}
