import { Dto } from "src/.dtos/dto";

export class AttendQueryDto extends Dto{ 
    body: {
        pageSize: number;

        pageIndex: number;

        aid: number;

        uid: number;
    };
}