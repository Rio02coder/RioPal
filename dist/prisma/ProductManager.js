"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
class ProductManager {
    /**
     * Method to check if the object is indeed a Product
     * @param obj The object to check
     * @returns boolean
     */
    isProduct(obj) {
        return (typeof obj === "object" &&
            obj.id &&
            obj.productName &&
            obj.price &&
            obj.quantity);
    }
    /**
     * Method to check if the object has at least one field of
     * a no id product
     * @param obj The object to check
     * @returns boolean
     */
    isNoIdProduct(obj) {
        return (typeof obj === "object" &&
            !obj.id &&
            (obj.productName || obj.price || obj.quantity));
    }
    /**
     * Method to add a no id product.
     * @param product An id less product.
     * @returns A promise containing the added product.
     */
    addProduct(product) {
        return client_1.prisma.product
            .create({ data: product })
            .then((product) => product)
            .catch(() => {
            throw new Error(
            // Error situation when the product does not contain the valid values for the field.
            "An error occurred with adding a product as it does not represent a valid product.");
        });
    }
    /**
     * Method to delete a product.
     * @param productId A number representing the product id to delete.
     * @returns A promise containing the deleted product.
     */
    deleteProduct(productId) {
        return client_1.prisma.product
            .delete({ where: { id: productId } })
            .then((product) => product)
            .catch(() => {
            throw new Error(
            // Error situation for when the product does not exist.
            "An error occurred with deleting the product. Such a product does not exist");
        });
    }
    /**
     * Method to get a product.
     * @param productId A number representing the product id to get.
     * @returns A promise containing the product
     */
    getProduct(productId) {
        return client_1.prisma.product
            .findUnique({ where: { id: productId } })
            .then((product) => product)
            .catch(() => {
            throw new Error(
            // Error situations for when the product does not exist.
            "An error occurred with getting the product. No such product exists.");
        });
    }
    /**
     * Method to update a product.
     * @param productId A number representing the product id to update.
     * @param updateProduct An updated product object.
     * @returns A promise containing the updated product.
     */
    updateProduct(productId, updateProduct) {
        if (!this.isNoIdProduct(updateProduct)) {
            throw new Error("Not a valid product");
        }
        return client_1.prisma.product
            .update({ where: { id: productId }, data: updateProduct })
            .then((product) => product)
            .catch(() => {
            // Error situations for when the product does not exist.
            throw new Error("An error occurred with updating the product. No such product exists.");
        });
    }
}
exports.default = ProductManager;
//# sourceMappingURL=ProductManager.js.map