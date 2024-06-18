import { Dto } from './../../.dtos/dto';

export class ParkingQueryDto extends Dto{ 
    body: {
        pageSize: number;

        pageIndex: number;
    }
}