import { Request, Response } from "express";
import Product from "./model/Product";
import ProductDto from "./dto/ProductDto";
import ErrorDto from "../dto/ErrorDto";
import makeError from "../utils/makeError";
//import ClientMysql from "../../utils/clientMysql";
//import ProductDto from "./dto/ProductDto";

export default class ProductService {
  private mysql: ClientMysql;
  private query = "SELECT * FROM product";

  constructor() {
    //this.mysql = new ClientMysql();
  }

  // public async addProduct(req: Request): Promise<ProductDto> {
  //   // ID segun documentacion viene en el request, por eso valido por el
  //   const { id } = req.body;
  //   if (await this.veryficProduct(id)) {
  //     const query = this.createInsertQuery(req.body);
  //     return this.mysql
  //       .query(query)
  //       .then((response: any) => {
  //         const product: ProductDto = req.body;
  //         product.id = response.insertId;
  //         return product;
  //       })
  //       .catch((err: any) => {
  //         console.log("Error add product", err);
  //         throw { code: 400, message: "No se agrego el producto" };
  //       });
  //   } else {
  //     throw { code: 400, message: "No se agrego el producto" };
  //   }
  // }

  // public async getListProduct(): Promise<ProductDto[]> {
  //   return this.mysql
  //     .query(this.query)
  //     .then((product: ProductDto[]) => product)
  //     .catch((err: any) => {
  //       throw { code: 400, message: "No se encontraron los productos" };
  //     });
  // }

  public async getProduct(id: number | string): Promise<ProductDto> {
    return this.mysql
      .query(`${this.query} WHERE id = ${id}`)
      .then((product: Product) => {
        const response: ProductDto = { ...product };
        return response;
      })
      .catch((err: any) => {
        throw makeError(404, `No se encontraron el producto con id ${id}`, err);
      });
  }

  // public async deleteProduct(data: Request | number | string): Promise<any> {
  //   this.getProduct(data)
  //     .then((product) => {
  //       this.mysql
  //         .query(`DELETE FROM product WHERE ID =  ${product.id}`)
  //         .then(() => true)
  //         .catch((err: any) => {
  //           throw { code: 400, message: "No se pudo eliminar" };
  //         });
  //     })
  //     .catch((err: any) => {
  //       throw {
  //         code: err?.code ? err.code : 404,
  //         message: err?.message
  //           ? err.message
  //           : "No se encontraron los productos",
  //       };
  //     });
  // }

  // public async editProduct(data: Request | number | string): Promise<any> {
  //   this.getProduct(data).then((product) => {});

  //   this.mysql.query(
  //     `UPDATE product SET name = ${product.name}, price = ${product.price} WHERE id = ${product.id}`
  //   );
  //   console.error("Id not found");
  //   throw { code: 400, message: "No se encontraron los productos" };
  // }

  // private async veryficProduct(id: number): Promise<boolean> {
  //   if (id) {
  //     const beer = await this.getBeer(id);
  //     return !!!beer;
  //   }
  //   console.error("Id not found");
  //   throw mapErrorBeer(400);
  // }

  // private createInsertQuery(body: any): string {
  //   //Utilizo la referencias en minuscula
  //   const { name, brewery, country, price, currency } = body;
  //   if (!!name && !!brewery && !!country && !!price && !!currency) {
  //     return `INSERT INTO beer (name, brewery, country, price, currency) VALUES ('${name}','${brewery}','${country}',${price},'${currency}')`;
  //   } else {
  //     console.error("Create insert query", body);
  //     throw mapErrorBeer(400);
  //   }
  // }
}
