import { Dto } from "src/.dtos/dto";

export class AttendCreateDto extends Dto{ 
    body: {
        uid: number;

        aid: number;
    };
}