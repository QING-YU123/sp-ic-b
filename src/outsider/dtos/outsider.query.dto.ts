import { Dto } from './../../.dtos/dto';

export class OutsiderQueryDto extends Dto{ 
    body: {
        pageSize: number;

        pageIndex: number;
    }
}