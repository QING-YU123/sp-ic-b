import { Dto } from "src/.dtos/dto";

export class OutsiderUpdateDto extends Dto{ 
    body: {
        id: number;

        phone: string;

        gender: string;

        name: string;

        address: string;
    }
}