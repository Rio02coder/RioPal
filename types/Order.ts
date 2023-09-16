import { Product } from "./Product";

export type noIdOrder = {
  productId: Product["id"];
  price: number;
};

export type Order = noIdOrder & {
  id: number;
  hasPaid: boolean;
};
