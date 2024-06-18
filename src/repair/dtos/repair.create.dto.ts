import { Dto } from "src/.dtos/dto";

export class RepairCreateDto extends Dto {
    body: {
        uid: number;

        title: string;

        content: string;

        address: string;
    }
}