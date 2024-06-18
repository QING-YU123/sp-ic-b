import { Dto } from "src/.dtos/dto";

export class PaymentCreateDto extends Dto {
    body: {
        uid: number;

        createdUid: number;

        title: string;

        content: string;

        price: number;
    }
}