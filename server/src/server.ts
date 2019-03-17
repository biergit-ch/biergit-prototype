import 'dotenv/config';
import App from './app';
import GroupController from './group/group.controller';
import UserController from './user/user.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new GroupController(), new UserController()]);

app.listen();
