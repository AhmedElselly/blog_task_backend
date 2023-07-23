import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import UserModel from 'src/schemas/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private user: typeof UserModel, private jwt: JwtService){}

  async register(req, res): Promise<any> {
    const user = new this.user(req.body);
    await user.setPassword(req.body.password);
    await user.save();
    return res.json(user);
  }

  async login(req, res): Promise<any> {
    const email = req.body.email.toLowerCase().replace(' ', '');
    const foundUser = await this.user.findOne({email});
    if(!foundUser) return res.status(400).json({message: 'User with that email doesn\'t exist! Please register.'});
    const {user} = await this.user.authenticate()(req.body.email, req.body.password);
    if(!user) return res.status(400).json({message: 'Email and password don\'t match!'});
    const token = this.jwt.sign({_id: user._id, username: user.username, email: user.email});
    return res.json({token, user});
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
