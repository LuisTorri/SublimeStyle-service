import express, { Application, Router } from "express";
import morgan from "morgan";
import modules from "./modules";

export default class Server {
  private application: Application;
  public router: Router;
  private morganFormat: string;

  constructor() {
    this.application = express();
    this.router = Router();
    this.morganFormat = ":date[iso] [:status] :url";

    this.application.use(express.json());
    this.application.use(morgan(this.morganFormat));
    this.insertRoutes();
  }

  public insertRoutes(): void {
    modules.forEach((module: any) => new module(this.router));
    this.application.use(this.router);
  }

  public run(): void {
    this.application.listen("3000", () =>
      console.info("Running express app on port 3000")
    );
  }
}
