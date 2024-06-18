import { Dto } from "src/.dtos/dto";

export class ParkingUpdateDto extends Dto {
    body: {
        id: number;

        phone: string;

        price: number;

        carNum: string;
    }
}