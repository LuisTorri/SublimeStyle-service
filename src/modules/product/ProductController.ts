import { Request, Response, Router } from "express";
import ProductService from "./ProductService";
import ProductDto from "./dto/ProductDto";
import makeError from "../utils/makeError";

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
    const { id } = req?.params;
    this.service
      .getProduct(id)
      .then((product: ProductDto) => {
        if (product) {
          res.send(product);
        } else {
          throw makeError(
            404,
            `No se encontro un producto asociado con el id ${id}`,
            product
          );
        }
      })
      .catch((err: any) => res.status(err.code).send(err));
  }

  deleteProduct(req: Request, res: Response) {
    const { id } = req?.params;
    this.service
      .deleteProduct(id)
      .then((isOk: boolean) => {
        if (isOk) {
          res.send({ message: "Se elimino con exito" });
        } else {
          throw makeError(400, "No se pudo eliminar", id);
        }
      })
      .catch((err: any) => res.status(err.code).send(err));
  }

  getListProduct(_req: Request, res: Response): void {
    this.service
      .getListProduct()
      .then((response) => res.send(response))
      .catch((err: any) => res.status(err.code).send(err));
  }

  addProduct(req: Request, res: Response) {
    const { body } = req;
    this.service
      .addProduct(body)
      .then((product: ProductDto) => res.status(201).send(product))
      .catch((err: any) => res.status(400).send(err));
  }

  editProduct(req: Request, res: Response) {
    const { body } = req;
    this.service
      .editProduct(body)
      .then((product: ProductDto) => res.status(201).send(product))
      .catch((err: any) => res.status(400).send(err));
  }
}
