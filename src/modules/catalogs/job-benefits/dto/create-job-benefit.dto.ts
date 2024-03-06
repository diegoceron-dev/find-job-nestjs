import { ApiProperty } from "@nestjs/swagger"

export class CreateJobBenefitDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    icon: string

    @ApiProperty()
    description: string
}
