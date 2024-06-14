export class FeedbackCreateDto {
    checkingUid: number;

    body: {
        createdTime: string;

        uid: number;

        title: string;

        content: string;

        image: string;
    }
}