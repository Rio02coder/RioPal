export type noIdProduct = {
    productName: string;
    price: number,
    quantity: number
}

export type Product = noIdProduct & {
    id: number;
}