import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import ProductDatabase from "../Database/Product";
import { noIdProduct, Product } from "../types/Product";
import { RequireAtLeastOne } from "../types/RequireAtLeastOne";
import { prisma } from "./client";

class ProductManager implements ProductDatabase {
  /**
   * Method to check if the object is indeed a Product
   * @param obj The object to check
   * @returns boolean
   */
  private isProduct(obj): boolean {
    return (
      typeof obj === "object" &&
      obj.id &&
      obj.productName &&
      obj.price &&
      obj.quantity
    );
  }

  /**
   * Method to check if the object has at least one field of
   * a no id product
   * @param obj The object to check
   * @returns boolean
   */
  private isNoIdProduct(obj): boolean {
    return (
      typeof obj === "object" &&
      !obj.id &&
      (obj.productName || obj.price || obj.quantity)
    );
  }

  /**
   * Method to add a no id product.
   * @param product An id less product.
   * @returns A promise containing the added product.
   */
  public addProduct(product: noIdProduct): Promise<Product> {
    return prisma.product
      .create({ data: product })
      .then((product) => product)
      .catch(() => {
        throw new Error(
          // Error situation when the product does not contain the valid values for the field.
          "An error occurred with adding a product as it does not represent a valid product."
        );
      });
  }

  /**
   * Method to delete a product.
   * @param productId A number representing the product id to delete.
   * @returns A promise containing the deleted product.
   */
  public deleteProduct(productId: number): Promise<Product> {
    return prisma.product
      .delete({ where: { id: productId } })
      .then((product) => product)
      .catch(() => {
        throw new Error(
          // Error situation for when the product does not exist.
          "An error occurred with deleting the product. Such a product does not exist"
        );
      });
  }

  /**
   * Method to get a product.
   * @param productId A number representing the product id to get.
   * @returns A promise containing the product
   */
  public getProduct(productId: number): Promise<Product | null> {
    return prisma.product
      .findUnique({ where: { id: productId } })
      .then((product) => product)
      .catch(() => {
        throw new Error(
          // Error situations for when the product does not exist.
          "An error occurred with getting the product. No such product exists."
        );
      });
  }

  /**
   * Method to update a product.
   * @param productId A number representing the product id to update.
   * @param updateProduct An updated product object.
   * @returns A promise containing the updated product.
   */
  public updateProduct(
    productId: Product["id"],
    updateProduct: RequireAtLeastOne<noIdProduct>
  ): Promise<Product> {
    if (!this.isNoIdProduct(updateProduct)) {
      throw new Error("Not a valid product");
    }
    return prisma.product
      .update({ where: { id: productId }, data: updateProduct })
      .then((product) => product)
      .catch(() => {
        // Error situations for when the product does not exist.
        throw new Error(
          "An error occurred with updating the product. No such product exists."
        );
      });
  }
}

export default ProductManager;
