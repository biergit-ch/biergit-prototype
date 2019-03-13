import { Model } from "mongoose";
import { IUserModel } from "./user";
import { IGroupModel } from "./group";

export interface IModel {
  user: Model<IUserModel>;
  group: Model<IGroupModel>;
}