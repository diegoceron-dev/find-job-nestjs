import { ApiProperty } from "@nestjs/swagger"

export class CreateJobDto {
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

    @ApiProperty()
    userId: number

    @ApiProperty()
    companyId: number
}
