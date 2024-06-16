import { Dto } from "src/.dtos/dto";

export class UserUploadHeadImgDto extends Dto {
    body: {
        headImg: string;
    }
}