import { ApiProperty } from "@nestjs/swagger";

export class CreateExchangeDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    description: string

    @ApiProperty()
    amountUSD: number
}
