import { Router } from "express";
import HealthCheckResponse from "./dto/HealthCheckResponse";

export default class HealthCheckService {
  constructor() {}

  public healthCheck(): HealthCheckResponse {
    return {
      status: "UP",
    };
  }
}
