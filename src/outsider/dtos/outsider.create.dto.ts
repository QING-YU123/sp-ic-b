import { Dto } from "src/.dtos/dto";

export class OutsiderCreateDto extends Dto{
    body: {
        phone: string;
    
        gender: string;
    
        name: string;
    
        address: string;
    }
}