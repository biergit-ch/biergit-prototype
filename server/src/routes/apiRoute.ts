import { GroupController } from '../controllers/groupController';
import { UserController } from '../controllers/userController';
import { BaseRoute } from './route';
import { Router, Request, Response, NextFunction } from 'express';

export class APIRoute extends BaseRoute {
  public groupController: GroupController = new GroupController();
  public userController: UserController = new UserController();

  /**
   * Create the routes.
   *
   * @class APIRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    //log
    console.log('[APIRoute::create] Creating api routes.');

    //add home page route
    router.get('/', (req: Request, res: Response, next: NextFunction) => {
      new APIRoute().index(req, res, next);
    });
    router.get('/groups', (req: Request, res: Response, next: NextFunction) => {
      new APIRoute().getGroups(req, res, next);
    });
    router.post('/groups', (req: Request, res: Response, next: NextFunction) => {
      new APIRoute().addGroup(req, res, next);
    });
    router.get('/users', (req: Request, res: Response, next: NextFunction) => {
      new APIRoute().getUsers(req, res, next);
    });
    router.post('/users', (req: Request, res: Response, next: NextFunction) => {
      new APIRoute().addUser(req, res, next);
    });
  }

  /**
   * Constructor
   *
   * @class IndexRoute
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * The home page route.
   *
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public index(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = 'Index biergit-prototype Web API';

    //set message
    let options: Object = {
      message: 'Login. Create a group. Spend a beer',
    };

    //render template
    this.render(req, res, 'index', options);
  }
  public getUsers(req: Request, res: Response, next: NextFunction) {
    return this.userController.getUsers(req, res);
  }

  public addUser(req: Request, res: Response, next: NextFunction) {
    return this.userController.addNewUser(req, res);
  }

  public getGroups(req: Request, res: Response, next: NextFunction) {
    return this.groupController.getGroups(req, res);
  }

  public addGroup(req: Request, res: Response, next: NextFunction) {
    return this.groupController.addNewGroup(req, res);
  }
}
