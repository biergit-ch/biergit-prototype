import * as mongoose from 'mongoose';
import { userSchema } from './../schemas/user';
import { Request, Response } from 'express';

const User = mongoose.model('User', userSchema);
export class UserController {
  public getUsers(req: Request, res: Response) {
    User.find((err, users) => {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  }

  public addNewUser(req: Request, res: Response) {
    let newUser = new User(req.body);

    newUser.save((err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  }
}
