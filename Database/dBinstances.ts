import OrderManager from "../prisma/OrderManager";
import ProductManager from "../prisma/ProductManager";
import OrderDatabase from "./Order";
import ProductDatabase from "./Product";

export const orderDatabase: OrderDatabase = new OrderManager();
export const productDatabase: ProductDatabase = new ProductManager();
