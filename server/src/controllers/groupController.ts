import * as mongoose from 'mongoose';
import { groupSchema } from './../schemas/group';
import { Request, Response } from 'express';

const Group = mongoose.model('Group', groupSchema);
export class GroupController {
  public getGroups(req: Request, res: Response) {
    Group.find((err, groups) => {
      if (err) {
        res.send(err);
      }
      res.json(groups);
    });
  }

  public addNewGroup(req: Request, res: Response) {
    let newGroup = new Group(req.body);

    newGroup.save((err, group) => {
      if (err) {
        res.send(err);
      }
      res.json(group);
    });
  }
}
