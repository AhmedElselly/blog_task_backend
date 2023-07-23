export class CreatePostDto {
    title: string;
    body: string;
    image: {
        data: Buffer,
        contentType: string
    }
}
