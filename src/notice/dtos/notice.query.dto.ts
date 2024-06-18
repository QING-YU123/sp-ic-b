import { Dto } from './../../.dtos/dto';

export class NoticeQueryDto extends Dto{ 
    body: {
        pageSize: number;

        pageIndex: number;
    }
}