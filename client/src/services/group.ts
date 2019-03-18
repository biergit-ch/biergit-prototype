import { IGroup } from './../models';
import axios, { AxiosPromise } from 'axios';

export default class GroupService {
  static getAll(): AxiosPromise<IGroup[]> {
    return axios.get<IGroup[]>(process.env.REACT_APP_API_URI + '/groups');
  }
  static post(): AxiosPromise<IGroup> {
    return axios.post<IGroup>(process.env.REACT_APP_API_URI + '/groups');
  }
}
