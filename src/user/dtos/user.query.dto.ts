import { Dto } from "src/.dtos/dto";

export class UserQueryDto extends Dto { 
    body: {
        pageSize: number;

        pageIndex: number;
    }
}