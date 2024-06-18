import { Dto } from './../../.dtos/dto';

export class MessageQueryDto extends Dto{ 
    body: {
        pageSize: number;

        pageIndex: number;
    }
}