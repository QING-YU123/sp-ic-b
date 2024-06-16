export class UserUpdateDto { 
    checkingUid: number;

    body: {
        id: number;

        phone: string;

        power: number;

        username: string;

        gender: string;

        headImg: string;

        introduction: string;

        name: string;

        idCard: string;

        address: string;

        CP: boolean;

        banTalk: boolean;

        status: number;
    }
}