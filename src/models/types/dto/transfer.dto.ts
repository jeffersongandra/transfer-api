import { ApiProperty } from '@nestjs/swagger';

export class TransferDto {
    @ApiProperty({ required: true, type: String, example: 'from_id'}) 
    fromId: string;
    @ApiProperty({ required: true, type: String, example: 'to_id'})
    toId: string;
    @ApiProperty({ required: true, type: Number, example: 100.50})
    value: number;
    @ApiProperty({ required: false, type: String, example: '10-05-2022'})
    expectedOn?: string;
}