import * as mongoose from 'mongoose';
import User from './user.interface';

const userSchema = new mongoose.Schema({
  userName: String,
  nickName: String,
  email: String,
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
