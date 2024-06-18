import { Dto } from './../../.dtos/dto';

export class StoreQueryDto extends Dto{ 
    body: {
        pageSize: number;

        pageIndex: number;

        myStore: boolean;
    }
}