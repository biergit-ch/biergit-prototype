import { IUser } from './../models';
import axios, { AxiosPromise } from 'axios';


export default class UserService {
    static getAll(): AxiosPromise<IUser[]> {
      return axios.get<IUser[]>(process.env.REACT_APP_API_URI + '/users');
    }
    static post(): AxiosPromise<IUser> {
      return axios.post<IUser>(process.env.REACT_APP_API_URI + '/users');
    }
  }
  