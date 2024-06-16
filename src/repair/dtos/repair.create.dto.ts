import { Dto } from "src/.dtos/dto";

export class RepairCreateDto extends Dto {
    body: {
        createdTime: string;

        uid: number;

        title: string;

        content: string;

        address: string;
    }
}