import { Dto } from "src/.dtos/dto";

export class RepairUpdateDto extends Dto {
    body: {
        id: number;

        status: number;
    }
}