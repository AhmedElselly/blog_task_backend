import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import Post, { postSchema } from '../schemas/post';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Post', schema: postSchema}])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
