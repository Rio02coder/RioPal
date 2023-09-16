import { Product, noIdProduct } from "../types/Product";
import { RequireAtLeastOne } from "../types/RequireAtLeastOne";

export default interface ProductDatabase {
  /**
   * Method for adding a product to the database.
   * @param product - This contains all attributes of a product except it's id.
   * This is because we do not allow consumers of this method to add a self described id to the product.
   * @returns A promise of Product. This product contains the id received after adding it to the db.
   */
  addProduct(product: noIdProduct): Promise<Product>;
  /**
   * Method to update the attributes of a product
   * @param productId This is a number representing the product id
   * @param updateProduct This is the updated product, containing values
   * for at least one or all of the attributes of a no id product. We
   * choose a no id product because we do not allow modification of the id
   * of a product.
   * @returns A promise of the updated Product.
   */
  updateProduct(
    productId: Product["id"],
    updateProduct: RequireAtLeastOne<noIdProduct>
  ): Promise<Product>;
  /**
   * Method to delete a specific product
   * @param productId This is a number representing the product id
   * @returns A promise of the deleted product.
   */
  deleteProduct(productId: Product["id"]): Promise<Product>;
  /**
   * Method to get a specific product
   * @param productId This is a number representing the product id
   * @returns A promise of the Product or null.
   */
  getProduct(productId: Product["id"]): Promise<Product | null>;
}
