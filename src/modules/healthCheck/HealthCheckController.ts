import { Request, Response, Router } from "express";
import HealthCheckService from "./HealthCheckService";

export default class HealthCheckController {
  private service: HealthCheckService;

  constructor(router: Router) {
    this.service = new HealthCheckService();
    const routes = Router();
    routes.get("/health-check", this.healthCheck.bind(this));
    router.use(routes);
  }

  private healthCheck(_req: Request, res: Response) {
    res.send(this.service.healthCheck());
  }
}
