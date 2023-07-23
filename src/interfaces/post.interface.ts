import { Document } from "mongoose";

export interface PostInterface extends Document {
    title: string;
    body: string;
    image: {
        data: Buffer,
        contentType: string
    }
}