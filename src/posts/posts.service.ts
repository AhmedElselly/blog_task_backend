import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostInterface } from 'src/interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel('Post') private post: Model<PostInterface>) {}
  async create(
    createPostDto: CreatePostDto,
    file: Express.Multer.File,
  ): Promise<any> {
    const post = new this.post(createPostDto);
    if (file) {
      post.image.data = file.buffer;
      post.image.contentType = file.mimetype;
    }
    await post.save();
    return post;
  }

  async findAll(): Promise<any> {
    const posts = await this.post.find();
    return posts;
  }

  async findOne(id: string): Promise<any> {
    const post = await this.post.findById(id);
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto, file: Express.Multer.File): Promise<any> {
    const post = await this.post.findById(id);
    post.title = updatePostDto.title;
    post.body = updatePostDto.body;
    if (file) {
      post.image.data = file.buffer;
      post.image.contentType = file.mimetype;
    }
    await post.save();
    return post;
  }

  async remove(id: string): Promise<any> {
    const post = await this.post.findById(id);
    await post.deleteOne();
    return { message: 'Post is removed successfully!' };
  }

  async getImage(id: string, res): Promise<any> {
    const post = await this.post.findById(id);
    res.set('Content-Type', post.image.contentType);
    return res.send(post.image.data);
  }
}
