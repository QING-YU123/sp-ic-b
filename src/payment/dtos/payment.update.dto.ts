import { Dto } from "src/.dtos/dto";

export class PaymentUpdateDto extends Dto {
    body: {
        id: number;

        payTime: string;
    }
}