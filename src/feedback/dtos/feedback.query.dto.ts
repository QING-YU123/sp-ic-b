import { Dto } from './../../.dtos/dto';

export class FeedbackQueryDto extends Dto{ 
    body: {
        pageSize: number;

        pageIndex: number;
    }
}