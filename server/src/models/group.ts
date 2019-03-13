import { Document } from "mongoose";
import { IGroup } from "../interfaces/group";

export interface IGroupModel extends IGroup, Document {
  //custom methods for your model would be defined here
}