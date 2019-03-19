import Group from 'src/group/group.interface';
import { Request } from 'express';

interface RequestWithGroup extends Request {
  group: Group;
}

export default RequestWithGroup;
