import * as bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import * as path from 'path';
import errorHandler = require('errorhandler');
import methodOverride = require('method-override');
import mongoose = require('mongoose'); //import mongoose

const API_PORT = process.env.PORT || 3001;
const app = express();
const router = express.Router();

// Set up a whitelist and check against it:
var whitelist = ['http://localhost:3000', 'https://biergit.it-wd.ch'];
var corsOptions = {
  origin: function(origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

//routes
import { IndexRoute } from './routes/index';

//interfaces
import { IUser } from './interfaces/user'; //import IUser

//models
import { IModel } from './models/model'; //import IModel
import { IUserModel } from './models/user'; //import IUserModel

//schemas
import { userSchema } from './schemas/user'; //import userSchema

/**
 * The server.
 *
 * @class Server
 */
export class App {
  public app: express.Application;

  private model: IModel; //an instance of IModel

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): App {
    return new App();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //instance defaults
    this.model = Object(); //initialize this to an empty object

    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //add routes
    this.routes();

    //add api
    this.api();
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api() {
    //empty for now
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {
    // this is our MongoDB database
    const MONGODB_CONNECTION: string = process.env.MONGODB_URL;
    //add static paths
    this.app.use(express.static(path.join(__dirname, 'public')));
    //mount logger
    this.app.use(logger('dev'));

    //mount json form parser
    this.app.use(bodyParser.json());

    //mount query string parser
    this.app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );

    //mount override
    this.app.use(methodOverride());

    //use q promises
    global.Promise = require('q').Promise;
    mongoose.Promise = global.Promise;

    //connect to mongoose
    let connection: mongoose.Connection = mongoose.createConnection(
      MONGODB_CONNECTION,
      { useNewUrlParser: true }
    );

    //create models
    this.model.user = connection.model<IUserModel>('User', userSchema);

    // catch 404 and forward to error handler
    this.app.use(function(
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      err.status = 404;
      next(err);
    });

    //error handling
    this.app.use(errorHandler());
  }

  /**
   * Create and return Router.
   *
   * @class Server
   * @method config
   * @return void
   */
  private routes() {
    let router: express.Router;
    router = express.Router();

    //IndexRoute
    IndexRoute.create(router);

    //use router middleware
    this.app.use('/api', router);
  }
}
