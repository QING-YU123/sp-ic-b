import { Dto } from "src/.dtos/dto";

export class ActivityCreateDto extends Dto{ 
    body: {
        uid: number;

        title: string;

        coverImg: string;

        introduction: string;

        tag: string;

        type: number;

        startTime: string;

        endTime: string;
        
    };
}