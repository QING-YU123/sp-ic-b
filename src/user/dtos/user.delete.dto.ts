import { Dto } from "src/.dtos/dto";

export class UserDeleteDto extends Dto {
    body: {
        id: number;
    }
}