import mongoose, {
  PassportLocalDocument,
  PassportLocalModel,
  Schema,
} from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';

export const userSchema = new Schema(
  {
    email: {
      type: String,
    },
    username: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
});

const UserModel: PassportLocalModel<PassportLocalDocument> = mongoose.model(
  'User',
  userSchema,
);

export default UserModel;
