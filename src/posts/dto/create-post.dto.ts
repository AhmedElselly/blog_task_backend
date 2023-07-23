import { Types } from "mongoose";

export class CreatePostDto {
    title: string;
    body: string;
    image: {
        data: Buffer,
        contentType: string
    };
    author: Types.ObjectId;
}
