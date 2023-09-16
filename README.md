
# RioPal

A REST API for implementing CRUD operations on products and orders. This should not be confused with PayPal :-)




## Installation

To install the project, first cd into the root of the project folder.

```bash
  npm install
```

To create the database, copy the code in MySQLFiles/schema.sql and run them on an SQL editor like MySQL Workbench.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file which should be added in the root directory of the project

`DATABASE_URL="mysql://<username>:<password>@localhost:3306/Riopal"`


## Run Locally

This part will only work as intended if the previous steps are fulfilled.

Start the server

```bash
  npx tsc
  npm start
```


## API Reference

#### Get a product

```http
  GET localhost:3000/product/?productId={id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `productId` | `number` | **Required**. The product Id |

#### Create a product

```http
  POST localhost:3000/product/add/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `productName`| `string` | **Required**. Name of the product |
| `price`| `number` | **Required**. Price of the product |
| `quantity`| `number` | **Required**. Quantity of the product |

#### Delete a product

```http
  DELETE localhost:3000/product/delete/?productId={id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `productId` | `number` | **Required**. The product Id |

#### Update a product

```http
  PATCH localhost:3000/product/update/?productId={id}
```
#### NOTE: At least one of the non required parameters have to be passed in the body
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `productId` | `number` | **Required**. The product Id |
| `productName` | `string` | The product name |
| `price`| `number` | Price of the product |
| `quantity`| `number` | Quantity of the product |


#### Get an order

```http
  GET localhost:3000/order/?orderId={id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `orderId` | `number` | **Required**. The order Id |

#### Create an order

```http
  POST localhost:3000/order/add/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `productId`| `number` | **Required**. Id of the product |
| `price`| `number` | **Required**. Price of the order |

#### Delete a product

```http
  DELETE localhost:3000/order/delete/?orderId={id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `orderId` | `number` | **Required**. The order Id |

#### Update a product

```http
  POST localhost:3000/order/pay/?orderId={id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `order` | `number` | **Required**. The order Id |
| `paymentReference` | `string` | The payment price in string format |


