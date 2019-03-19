import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import groupModel from './group.model';
import CreateGroupDto from './newgroup.dto';
import validationMiddleware from './../middleware/validation.middleware';
import UpdateGroupDto from './updategroup.dto';
import RequestWithGroup from 'src/interfaces/requestWithGroup.interface';

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
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(UpdateGroupDto, true),
      this.updateGroup,
    );
    this.router.delete(`${this.path}/:id`, this.deleteUser);
  }

  private listGroups = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    const groups = await this.group
      .find()
      .populate('owner')
      .populate('members')
      .exec();
    response.send(groups);
  };

  private createGroup = async (request: express.Request, response: express.Response) => {
    const createGroupDto: CreateGroupDto = request.body;
    const createGroup = new this.group({
      ...createGroupDto,
    });
    const savedGroup = await createGroup.save();
    response.send(savedGroup);
  };

  private updateGroup = async (request: RequestWithGroup, response: express.Response) => {
    const groupId = request.params.id;
    const updateGroup: UpdateGroupDto = request.body;
    const query = { _id: groupId };
    const savedGroup = await this.group.findOneAndUpdate(query, updateGroup).exec();
    response.send(savedGroup);
  };

  private deleteUser = async (request: express.Request, response: express.Response) => {
    const groupId = request.params.id;
    await this.group.findOneAndDelete(groupId);
    response.send();
  };
}

export default GroupController;
