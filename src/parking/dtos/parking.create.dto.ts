import { Dto } from "src/.dtos/dto";

export class ParkingCreateDto extends Dto {
    body: {
        id: number;

        price: number;
    }
}