import { IUser } from "./../models";
import axios, { AxiosPromise } from "axios";

export default class UserService {
  static getAll(): AxiosPromise<IUser[]> {
    return axios.get<IUser[]>(process.env.REACT_APP_API_URI + "/users");
  }
  static async create(newUser: IUser): Promise<IUser> {
    const res = await axios.post<IUser>(
      process.env.REACT_APP_API_URI + "/users",
      newUser
    );
    return await res.data;
  }
  static async update(updateUser: IUser): Promise<IUser> {
    const res = await axios.put<IUser>(
      process.env.REACT_APP_API_URI + "/users/" + updateUser._id,
      updateUser
    );
    return await res.data;
  }
  static async delete(userId: string): Promise<IUser[]> {
    const res = await axios.delete(
      process.env.REACT_APP_API_URI + "/users/" + userId
    );
    return await res.data;
  }
}
