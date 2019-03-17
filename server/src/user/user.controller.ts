import Controller from '../interfaces/controller.interface';
import CreateUserDto from './user.dto';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import userModel from './user.models';
import validationMiddleware from './../middleware/validation.middleware';
import * as express from 'express';

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
  }

  private listUsers = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    const users = await this.user.find();
    response.send(users);
  }

  private createUser = async (request: RequestWithUser, response: express.Response) => {
    const createUserDto: CreateUserDto = request.body;
    const createUser = new this.user({
      ...createUserDto,
    });
    const savedUser = await createUser.save();
    response.send(savedUser);
  }
}

export default UserController;
