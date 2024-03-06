import { ApiProperty } from "@nestjs/swagger";

export class CreateResumeDto {
    @ApiProperty()
    file: string
}
