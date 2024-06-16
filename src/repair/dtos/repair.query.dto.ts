import { Dto } from './../../.dtos/dto';

export class RepairQueryDto extends Dto{ 
    body: {
        pageSize: number;

        pageIndex: number;
    }
}