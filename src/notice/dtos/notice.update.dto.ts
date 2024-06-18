import { Dto } from "src/.dtos/dto";

export class NoticeUpdateDto extends Dto {
    body: {
        id: number;

        title: string;

        content: string;

        status: number;
    }
}