import { Dto } from "src/.dtos/dto";

export class AttendUpdateDto extends Dto{ 
    body: {
        id: number;

        result: string;
    };
}