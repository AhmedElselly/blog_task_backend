import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as cors from 'cors';
import helmet from 'helmet';
import * as passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import * as session from 'express-session';
import UserModel from 'src/schemas/user';

const PORT = process.env.PORT || 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(cors());

  app.use(session({
    secret: 'amazingcodingofnestjs',
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(UserModel.authenticate()));
  passport.serializeUser(UserModel.serializeUser());
  passport.deserializeUser(UserModel.deserializeUser());
  await app.listen(PORT);
}
bootstrap();
