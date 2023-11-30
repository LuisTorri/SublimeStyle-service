import { Request, Response, Router } from "express";
import ProductService from "./ProductService";
import ProductDto from "./dto/ProductDto";

export default class ProductController {
  private service: ProductService;

  constructor(router: Router) {
    this.service = new ProductService();
    this.configureRoutes(router);
  }

  private configureRoutes(router: Router) {
    const routes = Router();
    routes
      .route("/product/:id")
      .get(this.getProduct.bind(this))
      .delete(this.deleteProduct.bind(this));

    routes
      .route("/product")
      .get(this.getListProduct.bind(this))
      .post(this.addProduct.bind(this))
      .put(this.editProduct.bind(this));
    router.use(routes);
  }

  getProduct(req: Request, res: Response) {
    this.service
      .getProduct(req)
      .then((product: ProductDto) => {
        if (product) {
          res.send(product);
        } else {
          throw { code: 404, message: "No se encontro productos" };
        }
      })
      .catch((err: any) => res.status(err.code).send(err));
  }

  deleteProduct(req: Request, res: Response) {
    this.service
      .deleteProduct(req)
      .then((product: ProductDto) => res.status(201).send(product))
      .catch((err: any) => res.status(400).send(err));
  }

  getListProduct(_req: Request, res: Response): void {
    this.service
      .getListProduct()
      .then((response: ProductDto) => res.send(response))
      .catch((err: any) => res.status(err.code).send(err));
  }

  addProduct(req: Request, res: Response) {
    this.service
      .addProduct(req)
      .then((product: ProductDto) => res.status(201).send(product))
      .catch((err: any) => res.status(400).send(err));
  }

  editProduct(req: Request, res: Response) {
    this.service
      .editProduct(req)
      .then((product: ProductDto) => res.status(201).send(product))
      .catch((err: any) => res.status(400).send(err));
  }
}
