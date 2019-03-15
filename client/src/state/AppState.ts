import { Model } from './Helpers';

export interface IAppState {
    authenticated?: any;
    users?: any;
    groups?: any;
}

export const AppStateModel = Model<IAppState>({
    authenticated: null,
    users: null,
    groups: null
});

export class AppState extends AppStateModel {
    public authenticated: any;
    public users: any;
    public groups: any;
}