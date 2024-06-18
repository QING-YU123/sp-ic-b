import { Dto } from "src/.dtos/dto";

export class StoreDeleteDto extends Dto {
    body: {
        id: number;
    }
}