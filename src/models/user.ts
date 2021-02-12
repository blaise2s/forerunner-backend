// Referenced: https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1
import * as uniqueValidator from 'mongoose-unique-validator';
import { Schema, model, Document, Model } from 'mongoose';

export interface User {
  email: string;
  password: string;
}

export interface UserDocument extends User, Document {}

export interface UserModel extends Model<UserDocument> {}

const userSchema = new Schema<UserDocument, UserModel>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.plugin(uniqueValidator);

export default model<UserDocument, UserModel>('User', userSchema);
