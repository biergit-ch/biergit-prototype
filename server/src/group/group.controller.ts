import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import groupModel from './group.model';
import CreateGroupDto from './group.dto';
import validationMiddleware from './../middleware/validation.middleware';

class GroupController implements Controller {
  public path = '/groups';
  public router = express.Router();
  private group = groupModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.listGroups);
    this.router.post(`${this.path}/`, validationMiddleware(CreateGroupDto, true), this.createGroup);
  }

  private listGroups = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    const groups = await this.group.find();
    response.send(groups);
  }

  private createGroup = async (request: express.Request, response: express.Response) => {
    const createGroupDto: CreateGroupDto = request.body;
    const createGroup = new this.group({
      ...createGroupDto,
    });
    const savedGroup = await createGroup.save();
    response.send(savedGroup);
  }
}

export default GroupController;
