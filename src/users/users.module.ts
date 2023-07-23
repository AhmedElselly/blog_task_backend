import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/schemas/user';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt_startegy.strategy';


@Module({
  imports: [MongooseModule.forFeature([{name:'User', schema: userSchema}]), JwtModule.register({
    secret: "jknkjnskdjngkjfnsdklgnskljgnskljngkjsndfkjgnskljgnkjsndfkjgnskjng",
    signOptions: { expiresIn: '10d' },
  }),
  JwtStrategy],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
