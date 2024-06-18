import { Dto } from "src/.dtos/dto";

export class PaymentDeleteDto extends Dto {
    body: {
        id: number;
    }
}