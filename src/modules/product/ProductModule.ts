import { Router } from "express";
import ProductController from "./ProductController";

export default class ProductModule {
  private controller: ProductController;

  constructor(router: Router) {
    this.controller = new ProductController(router);
  }
}
