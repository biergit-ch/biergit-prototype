import Controller from '../interfaces/controller.interface';
import CreateUserDto from './newuser.dto';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import userModel from './user.models';
import validationMiddleware from './../middleware/validation.middleware';
import * as express from 'express';
import UpdateUserDto from './updateuser.dto';

class UserController implements Controller {
  public path = '/users';
  public router = express.Router();
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.listUsers);
    this.router.post(`${this.path}/`, validationMiddleware(CreateUserDto, true), this.createUser);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, true), this.updateUser);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
  }

  private listUsers = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    const users = await this.user.find();
    response.send(users);
  };

  private createUser = async (request: RequestWithUser, response: express.Response) => {
    const createUserDto: CreateUserDto = request.body;
    const createUser = new this.user({
      ...createUserDto,
    });
    const savedUser = await createUser.save();
    response.send(savedUser);
  };

  private updateUser = async (request: RequestWithUser, response: express.Response) => {
    const userId = request.params.id;
    const updatedUser: UpdateUserDto = request.body;
    const query = { _id: userId };
    const savedUser = await this.user.findOneAndUpdate(query, updatedUser).exec();
    response.send(savedUser);
  };

  private deleteUser = async (request: express.Request, response: express.Response) => {
    const userId = request.params.id;
    const query = { _id: userId };
    await this.user.findOneAndDelete(query);
    response.send();
  };
}

export default UserController;
