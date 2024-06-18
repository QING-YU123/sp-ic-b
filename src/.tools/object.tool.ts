import { Dto } from '../.dtos/dto';

export class ObjectTool {
    static isBodyExist(dto: Dto): boolean {
        return typeof dto.body !== 'undefined' && dto.body !== null;
    }
}