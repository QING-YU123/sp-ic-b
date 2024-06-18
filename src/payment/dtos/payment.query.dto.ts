import { Dto } from './../../.dtos/dto';

export class PaymentQueryDto extends Dto{ 
    body: {
        pageSize: number;

        pageIndex: number;
    }
}