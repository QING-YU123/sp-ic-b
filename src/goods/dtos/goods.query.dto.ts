import { Dto } from './../../.dtos/dto';

export class GoodsQueryDto extends Dto{ 
    body: {
        pageSize: number;

        pageIndex: number;
    }
}