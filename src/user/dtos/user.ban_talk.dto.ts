import { Dto } from "src/.dtos/dto";

export class UserBanTalkDto extends Dto { 
    body: {
        id: number,

        banTalk: boolean
    }
}