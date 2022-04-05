import { ApiProperty } from '@nestjs/swagger';
import { TransferDto } from './dto/transfer.dto';

export class Transfer extends TransferDto {
    @ApiProperty({ required: true, type: String, example: '1111111111111111'}) 
    id: string;
}