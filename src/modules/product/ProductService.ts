import { Request, Response } from "express";
import Product from "./model/Product";
import ProductDto from "./dto/ProductDto";
import ErrorDto from "../dto/ErrorDto";
import makeError from "../utils/makeError";
import DB from "../utils/db";
//import ClientMysql from "../../utils/clientMysql";
//import ProductDto from "./dto/ProductDto";

export default class ProductService {
  private db: DB;
  private query = "SELECT * FROM product";

  constructor() {
    this.db = new DB();
  }

  public async addProduct(product: ProductDto): Promise<ProductDto> {
    try {
      // Crear la consulta de inserción
      const query = this.createInsertQuery(product);

      // Ejecutar la consulta y manejar la respuesta
      const response: any = await this.db.query(query);

      const productNew = response?.rows[0];

      if (productNew) return productNew;
      else throw product;
    } catch (err) {
      // Lanzar una excepción con un mensaje personalizado
      throw makeError(400, "No se agregó el producto. Error interno", err);
    }
  }

  public async getListProduct(): Promise<ProductDto[]> {
    return this.db
      .query(this.query)
      .then((products: any) => products?.rows)
      .catch((err: any) => {
        throw makeError(404, "No se encontraron los productos", err);
      });
  }

  public async getProduct(id: number | string): Promise<ProductDto> {
    return this.db
      .query(`${this.query} WHERE id = ${id}`)
      .then((response: any) => {
        const productGot: ProductDto = { ...response?.rows[0] };
        if (productGot.id) return productGot;
        else throw id;
      })
      .catch((err: any) => {
        throw makeError(404, `No se encontraron el producto con id ${id}`, err);
      });
  }

  public async deleteProduct(id: number | string): Promise<boolean> {
    return this.getProduct(id)
      .then((product) => {
        return this.db
          .query(`DELETE FROM product WHERE ID =  ${product.id}`)
          .then(() => true)
          .catch((err: any) => {
            throw makeError(400, "No se pudo eliminar", err);
          });
      })
      .catch((err: any) => {
        throw makeError(
          err?.code ? err.code : 400,
          err?.message
            ? err.message
            : "No se pudo eliminar correctament el producto",
          err
        );
      });
  }

  public async editProduct(productEdit: ProductDto): Promise<ProductDto> {
    if (!productEdit?.id)
      throw makeError(400, "No se puede editar producto sin id", productEdit);
    return this.getProduct(productEdit.id)
      .then((product) => {
        return this.db
          .query(
            `UPDATE product SET name = '${productEdit.name}' , price = ${productEdit.price} WHERE ID  =  ${product.id}`
          )
          .then(() => productEdit)
          .catch((err: any) => {
            throw makeError(400, "No se pudo eliminar", err);
          });
      })
      .catch((err: any) => {
        throw makeError(
          err?.code ? err.code : 400,
          err?.message
            ? err.message
            : "No se pudo eliminar correctament el producto",
          err
        );
      });
  }

  private createInsertQuery(product: ProductDto): string {
    //Utilizo la referencias en minuscula
    const { name, price } = product;
    if (!!name && !!price) {
      return `INSERT INTO product (name, price) VALUES ('${name}',${price}) RETURNING *`;
    } else {
      throw makeError(400, `Create insert query ${product}`, null);
    }
  }
}
