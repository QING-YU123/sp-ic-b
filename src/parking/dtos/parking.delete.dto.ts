import { Dto } from "src/.dtos/dto";

export class ParkingDeleteDto extends Dto {
    body: {
        id: number;
    }
}