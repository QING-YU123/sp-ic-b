import { Dto } from "src/.dtos/dto";

export class ActivityUpdateDto extends Dto{ 
    body: {
        id: number;

        title: string;

        coverImg: string;

        introduction: string;

        tag: string;

        startTime: string;

        endTime: string;
        
        status : number;
    };
}